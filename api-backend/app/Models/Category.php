<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    use HasFactory;

    protected $guard = ['id'];

    protected $fillable = [
        'name'
    ];

    public function post(): BelongsToMany
    {
        return $this->belongsToMany(Post::class, 'post_categories');
    }


    public function scopeFilterCategory(Builder $query, $filters)
    {
        if ($search = $filters['search'] ?? false) {
            $query->where('name', 'like', '%' . $search . '%');
        }
    }
}
