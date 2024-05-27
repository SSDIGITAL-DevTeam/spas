<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Therapist extends Model
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

    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    public function employHistorys(): HasMany
    {
        return $this->hasMany(EmploymentHistory::class);
    }

    public function socialMedia(): HasMany
    {
        return $this->hasMany(SocialMedia::class);
    }
}
