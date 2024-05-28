<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Builder;

class Operator extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function cover(): HasOne
    {
        return $this->hasOne(Cover::class);
    }

    public function requestUpdate(): HasOne
    {
        return $this->hasOne(RequestUpdate::class);
    }

    public function branchOffices(): HasMany
    {
        return $this->hasMany(BranchOffice::class);
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    public function scopeFilterOperator(Builder $query, $filters)
    {
        if ($search = $filters['search'] ?? false) {
            $query->where('company_name', 'like', '%' . $search . '%');
        }
    }
}
