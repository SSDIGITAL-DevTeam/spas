<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CategoryPartner extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function valuePartners(): HasMany
    {
        return $this->hasMany(ValuePartner::class);
    }
}
