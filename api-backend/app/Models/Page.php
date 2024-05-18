<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Page extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function metas(): MorphMany
    {
        return $this->morphMany(Meta::class, 'metaable');
    }

    public function scopeFilterPage(Builder $query, $filters)
    {
        if ($search = $filters['search'] ?? false) {
            $query->where('name', 'like', '%' . $search . '%');
        }
    }
}
