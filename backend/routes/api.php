<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\SignPath\SignPathController;
use App\Http\Controllers\LessonSimulation\LessonSimulationController;
use App\Http\Controllers\SignPedia\SignPediaController;
use App\Http\Controllers\Challange\ChallengeController;
use App\Http\Controllers\Leaderboard\LeaderboardController;
use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\SignBot\SignBotController;
use App\Http\Controllers\Achievement\AchievementController;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('dashboard/stats', [DashboardController::class, 'stats']);

    Route::get('sign-path/paths', [SignPathController::class, 'allPaths']);
    Route::get('sign-path/paths/{path}/modules', [SignPathController::class, 'modulesByPath']);
    Route::get('sign-path/modules/{module}/lessons', [SignPathController::class, 'lessonsByModule']);

    Route::get('lesson-simulation/lessons/{lesson}', [LessonSimulationController::class, 'detail']);
    Route::post('lesson-simulation/complete', [LessonSimulationController::class, 'complete']);

    Route::get('sign-pedia/signs', [SignPediaController::class, 'allSigns']);
    Route::get('sign-pedia/search', [SignPediaController::class, 'search']);

    Route::get('challenge/lesson/{lesson}/quizzes', [ChallengeController::class, 'quizzesByLesson']);
    Route::post('challenge/submit', [ChallengeController::class, 'submitAnswer']);
    Route::get('user/quiz-attempts', [ChallengeController::class, 'userQuizAttempts']);

    Route::get('challenges', [ChallengeController::class, 'index']);
    Route::post('challenges/{challenge}/participate', [ChallengeController::class, 'participate']);
    Route::post('challenges/{challenge}/complete', [ChallengeController::class, 'completeChallenge']);

    Route::get('leaderboard/top', [LeaderboardController::class, 'topUsers']);

    Route::get('profile', [ProfileController::class, 'show']);
    Route::put('profile', [ProfileController::class, 'update']);

    Route::get('sign-bot/history', [SignBotController::class, 'history']);
    Route::post('sign-bot/message', [SignBotController::class, 'sendMessage']);

    // User progress and streaks
    Route::get('user/progress', [LessonSimulationController::class, 'userProgress']);
    Route::get('user/streak', [ProfileController::class, 'userStreak']);

    // User achievement and challenge routes
    Route::get('achievements', [AchievementController::class, 'index']);
    Route::get('my-achievements', [AchievementController::class, 'userAchievements']);
    Route::get('challenges', [ChallengeController::class, 'index']);

    // Admin routes
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        // Path management
        Route::apiResource('paths', SignPathController::class);

        // Module management
        Route::get('modules', [SignPathController::class, 'modulesIndex']);
        Route::post('modules', [SignPathController::class, 'storeModule']);
        Route::get('modules/{module}', [SignPathController::class, 'showModule']);
        Route::put('modules/{module}', [SignPathController::class, 'updateModule']);
        Route::delete('modules/{module}', [SignPathController::class, 'destroyModule']);

        // Lesson management
        Route::apiResource('lessons', LessonSimulationController::class);

        // Sign management
        Route::apiResource('signs', SignPediaController::class);

        // Quiz management
        Route::get('quizzes', [ChallengeController::class, 'quizzesIndex']);
        Route::post('quizzes', [ChallengeController::class, 'storeQuiz']);
        Route::get('quizzes/{quiz}', [ChallengeController::class, 'showQuiz']);
        Route::put('quizzes/{quiz}', [ChallengeController::class, 'updateQuiz']);
        Route::delete('quizzes/{quiz}', [ChallengeController::class, 'destroyQuiz']);

        // Achievement management
        Route::apiResource('achievements', AchievementController::class);
        Route::post('achievements/award', [AchievementController::class, 'award']);
        Route::get('users/{userId}/achievements', [AchievementController::class, 'userAchievements']);

        // Challenge management
        Route::apiResource('challenges', ChallengeController::class);
    });
});
