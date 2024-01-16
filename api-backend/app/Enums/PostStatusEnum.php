<?php

declare(strict_types=1);

namespace App\Enums;

use Illuminate\Support\Str;

enum PostStatusEnum: int
{
    case DRAFTED = 2;
    case PUBLISHED = 4;

    public function title(): string
    {
        return Str::of($this->name)->title()->value();
    }
}
