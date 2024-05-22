<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BranchOffice extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function operator(): BelongsTo
    {
        return $this->belongsTo(Operator::class);
    }
}
