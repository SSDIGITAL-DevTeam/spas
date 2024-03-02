<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\Page\StorePageRequest;
use App\Http\Requests\Page\UpdatePageRequest;
use App\Http\Resources\PageResource;
use App\Models\Meta;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PageController extends Controller
{
    public function index()
    {
        return PageResource::collection(
            Page::with('metas')
                ->latest()
                ->paginate(10)
        );
    }

    public function store(StorePageRequest $request)
    {
        $page = Page::create($request->validated());

        $page->metas()->create([
            'key' => $request->key,
            'value' => $request->value,
            'content' => $request->content,
        ]);

        // Menggunakan resource untuk memformat respons API
        return PageResource::make($page->load('metas'));
    }
    /**
     * Display the specified resource.
     */
    public function show(Page $page)
    {
        return new PageResource($page->load('metas'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePageRequest $request, Page $page)
    {

        $page->update($request->all());

        return new PageResource($page->load('metas'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page)
    {
        try {
            $page->delete();

            return response()->json(['message' => 'Page deleted successfully'], 200);
        } catch (\Exception $e) {
            // Jika terjadi kesalahan saat menghapus halaman
            return response()->json(['error' => 'Failed to delete page. ' . $e->getMessage()], 500);
        }
    }
}
