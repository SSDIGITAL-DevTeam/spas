<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
}
