<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\Member\StoreMemberRequest;
use App\Http\Requests\Member\UpdateMemberRequest;
use App\Http\Resources\MemberResource;
use App\Models\Member;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function index()
    {
        $members = Member::with('cover')
            ->latest()
            ->paginate(10);

        return MemberResource::collection($members);
    }

    public function store(StoreMemberRequest $request)
    {
        $member = Member::create($request->validated());

        if ($request->hasFile('url')) {
            $path = $request->file('url')->store('company-logo');

            $member->cover()->create(
                [
                    'url' => $path
                ]
            );
        }

        return new MemberResource($member->load('cover'));
    }

    public function show(Member $member)
    {
        return new MemberResource($member->load('cover'));
    }

    public function update(UpdateMemberRequest $request, Member $member)
    {
        $member->update($request->validated());

        $newFile = $request->file('url');
        if ($newFile) {
            $member->cover()->update(['url' => $newFile->store('company-logo')]);
        }

        return new MemberResource($member->load('cover'));
    }

    public function destroy(Member $member)
    {
        try {
            $member->cover()->delete();
            $member->delete();

            return response()->json(['message' => 'Member deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete member. ' . $e->getMessage()], 500);
        }
    }
}
