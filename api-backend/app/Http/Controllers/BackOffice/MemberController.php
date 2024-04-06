<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\Member\StoreMemberRequest;
use App\Http\Requests\Member\UpdateMemberRequest;
use App\Http\Resources\MemberResource;
use App\Models\Member;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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
        $validated = $request->validated();

        try {
            $member = DB::transaction(function () use ($request, $validated) {
                // Create the member
                $member = Member::create($validated);

                // Handle the file upload
                if ($request->hasFile('url')) {
                    $path = $request->file('url')->store('company-logo');
                    $member->cover()->create(['url' => $path]);
                }

                // Create associated user
                $member->user()->create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'role' => 'member',
                ]);

                return $member;
            });

            // Assuming you want to load the relationships immediately for the resource
            return new MemberResource($member->load('cover', 'user'));

            DB::commit();
        } catch (
            \Exception $e
        ) {
            DB::rollBack();
            throw $e;
        }
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
