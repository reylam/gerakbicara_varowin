<?php

namespace Database\Seeders;

use App\Models\UserProgress;
use App\Models\UserStreak;
use App\Models\UserAchievement;
use Illuminate\Database\Seeder;

class UserDataSeeder extends Seeder
{
    public function run(): void
    {
        // User Progress for Ahmad Rahman (user_id: 2)
        $ahmadProgress = [
            ['user_id' => 2, 'lesson_id' => 1, 'is_completed' => true, 'score' => 100, 'completed_at' => now()->subDays(5)],
            ['user_id' => 2, 'lesson_id' => 2, 'is_completed' => true, 'score' => 95, 'completed_at' => now()->subDays(4)],
            ['user_id' => 2, 'lesson_id' => 4, 'is_completed' => true, 'score' => 100, 'completed_at' => now()->subDays(3)],
            ['user_id' => 2, 'lesson_id' => 5, 'is_completed' => true, 'score' => 90, 'completed_at' => now()->subDays(2)],
        ];

        foreach ($ahmadProgress as $progress) {
            UserProgress::create($progress);
        }

        // User Progress for Siti Nurhaliza (user_id: 3)
        $sitiProgress = [
            ['user_id' => 3, 'lesson_id' => 1, 'is_completed' => true, 'score' => 100, 'completed_at' => now()->subDays(7)],
            ['user_id' => 3, 'lesson_id' => 2, 'is_completed' => true, 'score' => 100, 'completed_at' => now()->subDays(6)],
            ['user_id' => 3, 'lesson_id' => 3, 'is_completed' => true, 'score' => 95, 'completed_at' => now()->subDays(5)],
            ['user_id' => 3, 'lesson_id' => 4, 'is_completed' => true, 'score' => 100, 'completed_at' => now()->subDays(4)],
            ['user_id' => 3, 'lesson_id' => 5, 'is_completed' => true, 'score' => 100, 'completed_at' => now()->subDays(3)],
            ['user_id' => 3, 'lesson_id' => 7, 'is_completed' => true, 'score' => 90, 'completed_at' => now()->subDays(2)],
            ['user_id' => 3, 'lesson_id' => 8, 'is_completed' => true, 'score' => 95, 'completed_at' => now()->subDays(1)],
        ];

        foreach ($sitiProgress as $progress) {
            UserProgress::create($progress);
        }

        // User Streaks
        UserStreak::create([
            'user_id' => 2,
            'current_streak' => 2,
            'longest_streak' => 5,
            'last_active_date' => now()->subDays(1)->toDateString(),
        ]);

        UserStreak::create([
            'user_id' => 3,
            'current_streak' => 4,
            'longest_streak' => 7,
            'last_active_date' => now()->toDateString(),
        ]);

        UserStreak::create([
            'user_id' => 4,
            'current_streak' => 1,
            'longest_streak' => 3,
            'last_active_date' => now()->subDays(2)->toDateString(),
        ]);

        // User Achievements
        UserAchievement::create([
            'user_id' => 2,
            'achievement_id' => 1, // Pelajar Pertama
            'earned_at' => now()->subDays(5),
        ]);

        UserAchievement::create([
            'user_id' => 3,
            'achievement_id' => 1, // Pelajar Pertama
            'earned_at' => now()->subDays(7),
        ]);

        UserAchievement::create([
            'user_id' => 3,
            'achievement_id' => 2, // Pembelajar Aktif
            'earned_at' => now()->subDays(3),
        ]);

        UserAchievement::create([
            'user_id' => 3,
            'achievement_id' => 3, // Master Alfabet
            'earned_at' => now()->subDays(2),
        ]);
    }
}
