<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class RequestUpdate extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function operator(): BelongsTo
    {
        return $this->belongsTo(Operator::class);
    }

    public function therapist(): BelongsTo
    {
        return $this->belongsTo(Therapist::class);
    }

    public function cover(): BelongsTo
    {
        return $this->belongsTo(Cover::class);
    }

    public function scopeFilterRequest(Builder $query, $filters)
    {
        if ($search = $filters['search'] ?? false) {
            $query->where(function ($query) use ($search) {
                $query->where('company_name', 'like', '%' . $search . '%')
                    ->orWhere('name', 'like', '%' . $search . '%');
            });
        }
    }
}
