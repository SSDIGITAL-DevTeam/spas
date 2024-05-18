<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Post extends Model
{
    use HasFactory;

    protected $guarded = ['id'];


    /** @var model\cover */
    public function cover(): HasOne
    {
        return $this->hasOne(Cover::class);
    }

    /** @var model\tags */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'post_tags');
    }

    /** @var model\categories */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'post_categories');
    }

    /** @var model\metas */
    public function metas()
    {
        return $this->morphMany(Meta::class, 'metaable');
    }

    public function scopeFilterPost(Builder $query, $filters)
    {
        if ($search = $filters['search'] ?? false) {
            $query->where('title', 'like', '%' . $search . '%');
        }
    }

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($post) {
            $post->tags()->detach(); // Menghapus entri terkait dari tabel post_tags
        });

        static::deleting(function ($post) {
            $post->categories()->detach(); // Menghapus entri terkait dari tabel post_tags
        });
    }
}
