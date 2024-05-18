<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function scopeFilterEvent(Builder $query, $filters)
    {
        if ($search = $filters['search'] ?? false) {
            $query->where('name', 'like', '%' . $search . '%');
        }
    }
}
