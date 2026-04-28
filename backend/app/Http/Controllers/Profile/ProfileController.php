<?php

namespace App\Http\Controllers\Profile;

use App\Models\UserStreak;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Exception;

class ProfileController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'message' => 'Profile retrieved',
                'data' => ['user' => $request->user()],
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve profile',
                'data' => null,
            ], 500);
        }
    }

    public function update(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|required|string|max:255',
                'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->errors()->first(),
                    'data' => null,
                ], 422);
            }

            $user->fill($request->only(['name', 'email']));
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => ['user' => $user->fresh()],
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to update profile',
                'data' => null,
            ], 500);
        }
    }

    public function userStreak(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            $streak = UserStreak::where('user_id', $user->id)->first();

            if (!$streak) {
                $streak = UserStreak::create([
                    'user_id' => $user->id,
                    'current_streak' => 0,
                    'longest_streak' => 0,
                    'last_active_date' => now()->toDateString(),
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'User streak retrieved',
                'data' => $streak,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve user streak',
                'data' => null,
            ], 500);
        }
    }
}
