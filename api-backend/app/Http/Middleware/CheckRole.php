<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role)
    {
        // dd(auth()->user()->role, $role);

        if (auth()->user()->role->value !== $role) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
