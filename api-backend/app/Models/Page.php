<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Page extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function meta(): MorphMany
    {
        return $this->morphMany(Meta::class, 'metaable');
    }
}
