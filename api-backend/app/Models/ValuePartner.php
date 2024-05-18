<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ValuePartner extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function categoryPartner(): BelongsTo
    {
        return $this->belongsTo(CategoryPartner::class);
    }

    public function scopeFilterPartner(Builder $query, $filters)
    {
        if ($search = $filters['search'] ?? false) {
            $query->where('brand_name', 'like', '%' . $search . '%');
        }
    }
}
