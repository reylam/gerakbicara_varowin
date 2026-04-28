<?php

namespace Database\Seeders;

use App\Models\Challenge;
use Illuminate\Database\Seeder;

class ChallengeSeeder extends Seeder
{
    public function run(): void
    {
        $challenges = [
            [
                'title' => 'Tantangan Alfabet Kilat',
                'description' => 'Selesaikan semua pelajaran alfabet dalam waktu 24 jam',
                'xp_reward' => 100,
            ],
            [
                'title' => 'Master Sapaan',
                'description' => 'Kuasi semua isyarat sapaan dan perkenalan',
                'xp_reward' => 75,
            ],
            [
                'title' => 'Komunikator Harian',
                'description' => 'Belajar 3 pelajaran baru setiap hari selama seminggu',
                'xp_reward' => 150,
            ],
            [
                'title' => 'Penjelajah BISINDO',
                'description' => 'Pelajari 50 tanda berbeda dalam SignPedia',
                'xp_reward' => 125,
            ],
            [
                'title' => 'Ahli Kuis',
                'description' => 'Jawab 20 pertanyaan kuis dengan benar secara berturut-turut',
                'xp_reward' => 200,
            ],
        ];

        foreach ($challenges as $challenge) {
            Challenge::create($challenge);
        }
    }
}
