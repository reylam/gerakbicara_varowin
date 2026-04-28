<?php

namespace App\Http\Controllers\Challange;

use App\Models\Challenge;
use App\Models\Quiz;
use App\Models\QuizAnswer;
use App\Models\UserChallenge;
use App\Models\UserQuizAttempt;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Exception;

class ChallengeController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $challenges = Challenge::all();

            return response()->json([
                'success' => true,
                'message' => 'Challenges retrieved',
                'data' => $challenges,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve challenges',
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

            $challenge = Challenge::create($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Challenge created',
                'data' => $challenge,
            ], 201);
        } catch (Exception $exception) {
            return $this->exceptionResponse('Challenge creation failed', $exception);
        }
    }

    public function show(Challenge $challenge): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'message' => 'Challenge retrieved',
                'data' => $challenge,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve challenge',
                'data' => null,
            ], 500);
        }
    }

    public function update(Request $request, Challenge $challenge): JsonResponse
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

            $challenge->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Challenge updated',
                'data' => $challenge,
            ]);
        } catch (Exception $exception) {
            return $this->exceptionResponse('Challenge update failed', $exception);
        }
    }

    public function destroy(Challenge $challenge): JsonResponse
    {
        try {
            $challenge->delete();

            return response()->json([
                'success' => true,
                'message' => 'Challenge deleted',
                'data' => null,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to delete challenge',
                'data' => null,
            ], 500);
        }
    }

    public function participate(Request $request, Challenge $challenge): JsonResponse
    {
        try {
            $user = $request->user();

            // Check if user already participated in this challenge
            $existing = UserChallenge::where('user_id', $user->id)
                ->where('challenge_id', $challenge->id)
                ->first();

            if ($existing) {
                return response()->json([
                    'success' => false,
                    'message' => 'User already participated in this challenge',
                    'data' => null,
                ], 400);
            }

            $userChallenge = UserChallenge::create([
                'user_id' => $user->id,
                'challenge_id' => $challenge->id,
                'is_completed' => false,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Challenge participation started',
                'data' => $userChallenge->load('challenge'),
            ]);
        } catch (Exception $exception) {
            return $this->exceptionResponse('Challenge participation failed', $exception);
        }
    }

    public function completeChallenge(Request $request, Challenge $challenge): JsonResponse
    {
        try {
            $user = $request->user();

            $userChallenge = UserChallenge::where('user_id', $user->id)
                ->where('challenge_id', $challenge->id)
                ->where('is_completed', false)
                ->first();

            if (!$userChallenge) {
                return response()->json([
                    'success' => false,
                    'message' => 'User has not started this challenge or already completed it',
                    'data' => null,
                ], 400);
            }

            $userChallenge->update(['is_completed' => true]);
            $user->increment('xp', $challenge->xp_reward);
            $user->update(['level' => $this->calculateLevel($user->xp)]);

            return response()->json([
                'success' => true,
                'message' => 'Challenge completed',
                'data' => [
                    'challenge' => $challenge,
                    'xp_awarded' => $challenge->xp_reward,
                ],
            ]);
        } catch (Exception $exception) {
            return $this->exceptionResponse('Challenge completion failed', $exception);
        }
    }

    public function quizzesIndex(): JsonResponse
    {
        try {
            $quizzes = Quiz::with('lesson.module')->orderBy('id')->get();

            return response()->json([
                'success' => true,
                'message' => 'Quizzes retrieved',
                'data' => $quizzes,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve quizzes',
                'data' => null,
            ], 500);
        }
    }

    public function storeQuiz(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'lesson_id' => 'required|integer|exists:lessons,id',
                'question' => 'required|string',
                'type' => 'required|in:multiple_choice,true_false',
            ]);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors()->first());
            }

            $quiz = Quiz::create($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Quiz created',
                'data' => $quiz,
            ], 201);
        } catch (Exception $exception) {
            return $this->exceptionResponse('Quiz creation failed', $exception);
        }
    }

    public function showQuiz(Quiz $quiz): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'message' => 'Quiz retrieved',
                'data' => $quiz->load('lesson.module', 'quizAnswers'),
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve quiz',
                'data' => null,
            ], 500);
        }
    }

    public function updateQuiz(Request $request, Quiz $quiz): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'lesson_id' => 'required|integer|exists:lessons,id',
                'question' => 'required|string',
                'type' => 'required|in:multiple_choice,true_false',
            ]);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors()->first());
            }

            $quiz->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Quiz updated',
                'data' => $quiz,
            ]);
        } catch (Exception $exception) {
            return $this->exceptionResponse('Quiz update failed', $exception);
        }
    }

    public function destroyQuiz(Quiz $quiz): JsonResponse
    {
        try {
            $quiz->delete();

            return response()->json([
                'success' => true,
                'message' => 'Quiz deleted',
                'data' => null,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to delete quiz',
                'data' => null,
            ], 500);
        }
    }

    public function quizzesByLesson(int $lessonId): JsonResponse
    {
        try {
            $quizzes = Quiz::with('quizAnswers')
                ->where('lesson_id', $lessonId)
                ->orderBy('id')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Quizzes retrieved',
                'data' => $quizzes,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve quizzes',
                'data' => null,
            ], 500);
        }
    }

    public function submitAnswer(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'quiz_id' => 'required|integer|exists:quizzes,id',
                'selected_answer_id' => 'required|integer|exists:quiz_answers,id',
            ]);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors()->first());
            }

            $quiz = Quiz::find($request->quiz_id);
            if (! $quiz) {
                return response()->json([
                    'success' => false,
                    'message' => 'Quiz not found',
                    'data' => null,
                ], 404);
            }

            $user = $request->user();

            if (UserQuizAttempt::where('user_id', $user->id)->where('quiz_id', $quiz->id)->exists()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Quiz has already been attempted by this user',
                    'data' => null,
                ], 409);
            }

            $answer = QuizAnswer::where('id', $request->selected_answer_id)
                ->where('quiz_id', $quiz->id)
                ->first();

            if (! $answer) {
                return response()->json([
                    'success' => false,
                    'message' => 'Selected answer does not belong to this quiz',
                    'data' => null,
                ], 422);
            }

            $result = DB::transaction(function () use ($user, $quiz, $answer) {
                $isCorrect = $answer->is_correct;
                UserQuizAttempt::create([
                    'user_id' => $user->id,
                    'quiz_id' => $quiz->id,
                    'selected_answer_id' => $answer->id,
                    'is_correct' => $isCorrect,
                ]);

                if ($isCorrect) {
                    $user->increment('xp', 5);
                    $user->update(['level' => $this->calculateLevel($user->xp)]);
                }

                return [
                    'is_correct' => $isCorrect,
                    'xp_awarded' => $isCorrect ? 5 : 0,
                ];
            });

            return response()->json([
                'success' => true,
                'message' => 'Answer submitted',
                'data' => [
                    'quiz_id' => $quiz->id,
                    'is_correct' => $result['is_correct'],
                    'xp_awarded' => $result['xp_awarded'],
                ],
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to submit answer',
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
