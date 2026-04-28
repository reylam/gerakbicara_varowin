<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Exception;

class DashboardController extends Controller
{
    public function stats(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            $recentProgress = $user->userProgress()
                ->with('lesson.module.path')
                ->where('is_completed', true)
                ->orderByDesc('completed_at')
                ->take(5)
                ->get();

            $streak = $user->userStreak;

            return response()->json([
                'success' => true,
                'message' => 'Dashboard stats retrieved',
                'data' => [
                    'xp' => $user->xp,
                    'level' => $user->level,
                    'streak' => [
                        'current' => $streak?->current_streak ?? 0,
                        'longest' => $streak?->longest_streak ?? 0,
                        'last_active_date' => $streak?->last_active_date?->toDateString(),
                    ],
                    'recent_completed_lessons' => $recentProgress,
                ],
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve dashboard stats',
                'data' => null,
            ], 500);
        }
    }
}
