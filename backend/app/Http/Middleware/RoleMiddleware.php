<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string $role): mixed
    {
        $user = $request->user();

        if (! $user || $user->role !== $role) {
            return new JsonResponse([
                'success' => false,
                'message' => 'Unauthorized role access',
                'data' => null,
            ], 403);
        }

        return $next($request);
    }
}
