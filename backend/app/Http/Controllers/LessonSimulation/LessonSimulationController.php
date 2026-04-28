<?php

namespace App\Http\Controllers\LessonSimulation;

use App\Models\Lesson;
use App\Models\UserProgress;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Exception;

class LessonSimulationController extends Controller
{
    public function detail(int $lessonId): JsonResponse
    {
        try {
            $lesson = Lesson::with('module.path', 'quizzes.quizAnswers')->find($lessonId);

            if (! $lesson) {
                return response()->json([
                    'success' => false,
                    'message' => 'Lesson not found',
                    'data' => null,
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Lesson detail retrieved',
                'data' => $lesson,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve lesson detail',
                'data' => null,
            ], 500);
        }
    }

    public function complete(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'lesson_id' => 'required|integer|exists:lessons,id',
            ]);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors()->first());
            }

            $lesson = Lesson::find($request->lesson_id);
            $user = $request->user();

            if (! $lesson) {
                return response()->json([
                    'success' => false,
                    'message' => 'Lesson not found',
                    'data' => null,
                ], 404);
            }

            $result = DB::transaction(function () use ($user, $lesson) {
                $progress = UserProgress::firstOrCreate([
                    'user_id' => $user->id,
                    'lesson_id' => $lesson->id,
                ], [
                    'is_completed' => false,
                    'score' => null,
                ]);

                if ($progress->is_completed) {
                    return [
                        'status' => 409,
                        'payload' => null,
                    ];
                }

                $xpReward = 10;

                $progress->update([
                    'is_completed' => true,
                    'score' => 100,
                    'completed_at' => now(),
                ]);

                $user->increment('xp', $xpReward);
                $user->update(['level' => $this->calculateLevel($user->xp)]);

                return [
                    'status' => 200,
                    'payload' => [
                        'lesson' => $lesson,
                        'xp_awarded' => $xpReward,
                        'total_xp' => $user->xp,
                        'level' => $user->level,
                    ],
                ];
            });

            if ($result['status'] === 409) {
                return response()->json([
                    'success' => false,
                    'message' => 'Lesson already completed',
                    'data' => null,
                ], 409);
            }

            return response()->json([
                'success' => true,
                'message' => 'Lesson completed successfully',
                'data' => $result['payload'],
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to complete lesson',
                'data' => null,
            ], 500);
        }
    }

    public function userProgress(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            $progress = UserProgress::with('lesson.module.path')
                ->where('user_id', $user->id)
                ->orderBy('completed_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'User progress retrieved',
                'data' => $progress,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve user progress',
                'data' => null,
            ], 500);
        }
    }

    // Admin CRUD methods for lessons
    public function index(): JsonResponse
    {
        try {
            $lessons = Lesson::with('module.path')->orderBy('order')->get();

            return response()->json([
                'success' => true,
                'message' => 'Lessons retrieved',
                'data' => $lessons,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve lessons',
                'data' => null,
            ], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'module_id' => 'required|integer|exists:modules,id',
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'difficulty' => 'required|in:easy,medium,hard',
                'order' => 'required|integer|min:0',
            ]);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors()->first());
            }

            $lesson = Lesson::create($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Lesson created',
                'data' => $lesson,
            ], 201);
        } catch (Exception $exception) {
            return $this->exceptionResponse('Lesson creation failed', $exception);
        }
    }

    public function show(Lesson $lesson): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'message' => 'Lesson retrieved',
                'data' => $lesson->load('module.path'),
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve lesson',
                'data' => null,
            ], 500);
        }
    }

    public function update(Request $request, Lesson $lesson): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'module_id' => 'required|integer|exists:modules,id',
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'difficulty' => 'required|in:easy,medium,hard',
                'order' => 'required|integer|min:0',
            ]);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors()->first());
            }

            $lesson->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Lesson updated',
                'data' => $lesson,
            ]);
        } catch (Exception $exception) {
            return $this->exceptionResponse('Lesson update failed', $exception);
        }
    }

    public function destroy(Lesson $lesson): JsonResponse
    {
        try {
            $lesson->delete();

            return response()->json([
                'success' => true,
                'message' => 'Lesson deleted',
                'data' => null,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to delete lesson',
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

    private function calculateLevel(int $xp): int
    {
        return (int) floor($xp / 100);
    }
}
