<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            PathSeeder::class,
            ModuleSeeder::class,
            LessonSeeder::class,
            SignSeeder::class,
            QuizSeeder::class,
            AchievementSeeder::class,
            ChallengeSeeder::class,
            ChatMessageSeeder::class,
            UserDataSeeder::class,
        ]);
    }
}
