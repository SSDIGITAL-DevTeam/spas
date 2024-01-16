<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $guard = ['id'];

    protected $fillable = [
        'name'
    ];

    /**
     * Get all of the posts that are assigned this tag.
     */
    public function post(): BelongsToMany
    {
        return $this->belongsToMany(Post::class, 'post_categories');
    }
}
