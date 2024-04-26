<?php

namespace App\Enums;

enum UserStatus: string
{
    case Admin = 'admin';
    case Operator = 'operator';
    case Therapist = 'therapist';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
