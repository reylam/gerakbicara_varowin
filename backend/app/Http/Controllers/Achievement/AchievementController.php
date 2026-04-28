<?php

namespace App\Http\Controllers\Achievement;

use App\Models\Achievement;
use App\Models\UserAchievement;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Exception;

class AchievementController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $achievements = Achievement::all();

            return response()->json([
                'success' => true,
                'message' => 'Achievements retrieved',
                'data' => $achievements,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve achievements',
                'data' => null,
            ], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'xp_reward' => 'required|integer|min:0',
            ]);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors()->first());
            }

            $achievement = Achievement::create($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Achievement created',
                'data' => $achievement,
            ], 201);
        } catch (Exception $exception) {
            return $this->exceptionResponse('Achievement creation failed', $exception);
        }
    }

    public function show(Achievement $achievement): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'message' => 'Achievement retrieved',
                'data' => $achievement,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve achievement',
                'data' => null,
            ], 500);
        }
    }

    public function update(Request $request, Achievement $achievement): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'xp_reward' => 'required|integer|min:0',
            ]);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors()->first());
            }

            $achievement->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Achievement updated',
                'data' => $achievement,
            ]);
        } catch (Exception $exception) {
            return $this->exceptionResponse('Achievement update failed', $exception);
        }
    }

    public function destroy(Achievement $achievement): JsonResponse
    {
        try {
            $achievement->delete();

            return response()->json([
                'success' => true,
                'message' => 'Achievement deleted',
                'data' => null,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to delete achievement',
                'data' => null,
            ], 500);
        }
    }

    public function award(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'user_id' => 'required|integer|exists:users,id',
                'achievement_id' => 'required|integer|exists:achievements,id',
            ]);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors()->first());
            }

            // Check if user already has this achievement
            $existing = UserAchievement::where('user_id', $request->user_id)
                ->where('achievement_id', $request->achievement_id)
                ->first();

            if ($existing) {
                return response()->json([
                    'success' => false,
                    'message' => 'User already has this achievement',
                    'data' => null,
                ], 400);
            }

            $userAchievement = UserAchievement::create([
                'user_id' => $request->user_id,
                'achievement_id' => $request->achievement_id,
                'earned_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Achievement awarded',
                'data' => $userAchievement->load('achievement'),
            ]);
        } catch (Exception $exception) {
            return $this->exceptionResponse('Achievement award failed', $exception);
        }
    }

    public function userAchievements(Request $request, int $userId = null): JsonResponse
    {
        try {
            $targetUserId = $userId ?? $request->user()->id;

            $achievements = UserAchievement::with('achievement')
                ->where('user_id', $targetUserId)
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'User achievements retrieved',
                'data' => $achievements,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve user achievements',
                'data' => null,
            ], 500);
        }
    }

    private function validationErrorResponse(string $message): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'data' => null,
        ], 422);
    }

    private function exceptionResponse(string $message, Exception $exception): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'data' => null,
        ], 500);
    }
}
