<?php

namespace App\Http\Controllers\Leaderboard;

use App\Models\Leaderboard;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Exception;

class LeaderboardController extends Controller
{
    public function topUsers(): JsonResponse
    {
        try {
            $leaderboard = Leaderboard::whereDate('start_date', '<=', now())
                ->whereDate('end_date', '>=', now())
                ->latest('start_date')
                ->first();

            if ($leaderboard) {
                $entries = $leaderboard->leaderboardEntries()
                    ->with('user:id,name,level')
                    ->orderByDesc('xp')
                    ->take(10)
                    ->get();

                $data = $entries->map(function ($entry, $index) {
                    return [
                        'rank' => $index + 1,
                        'id' => $entry->user->id,
                        'name' => $entry->user->name,
                        'xp' => $entry->xp,
                        'level' => $entry->user->level,
                    ];
                });

                return response()->json([
                    'success' => true,
                    'message' => 'Leaderboard retrieved',
                    'data' => [
                        'leaderboard' => [
                            'id' => $leaderboard->id,
                            'name' => $leaderboard->name,
                            'start_date' => $leaderboard->start_date->toDateString(),
                            'end_date' => $leaderboard->end_date->toDateString(),
                            'entries' => $data,
                        ],
                    ],
                ]);
            }

            $users = User::select('id', 'name', 'xp', 'level')
                ->orderByDesc('xp')
                ->take(10)
                ->get()
                ->map(function ($user, $index) {
                    return [
                        'rank' => $index + 1,
                        'id' => $user->id,
                        'name' => $user->name,
                        'xp' => $user->xp,
                        'level' => $user->level,
                    ];
                });

            return response()->json([
                'success' => true,
                'message' => 'Leaderboard retrieved',
                'data' => $users,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve leaderboard',
                'data' => null,
            ], 500);
        }
    }
}
