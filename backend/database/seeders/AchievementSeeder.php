<?php

namespace Database\Seeders;

use App\Models\Achievement;
use Illuminate\Database\Seeder;

class AchievementSeeder extends Seeder
{
    public function run(): void
    {
        $achievements = [
            [
                'title' => 'Pelajar Pertama',
                'description' => 'Menyelesaikan pelajaran pertama Anda',
                'xp_reward' => 10,
            ],
            [
                'title' => 'Pembelajar Aktif',
                'description' => 'Menyelesaikan 5 pelajaran',
                'xp_reward' => 25,
            ],
            [
                'title' => 'Master Alfabet',
                'description' => 'Menyelesaikan semua pelajaran alfabet BISINDO',
                'xp_reward' => 50,
            ],
            [
                'title' => 'Komunikator Handal',
                'description' => 'Menyelesaikan 10 pelajaran',
                'xp_reward' => 75,
            ],
            [
                'title' => 'Streak Master',
                'description' => 'Mempertahankan streak belajar selama 7 hari',
                'xp_reward' => 100,
            ],
            [
                'title' => 'Penjelajah Tanda',
                'description' => 'Melihat 20 tanda berbeda di SignPedia',
                'xp_reward' => 30,
            ],
            [
                'title' => 'Master Kuis',
                'description' => 'Menjawab 10 pertanyaan kuis dengan benar',
                'xp_reward' => 40,
            ],
            [
                'title' => 'Pembelajar Konsisten',
                'description' => 'Belajar selama 30 hari berturut-turut',
                'xp_reward' => 200,
            ],
        ];

        foreach ($achievements as $achievement) {
            Achievement::create($achievement);
        }
    }
}
