<?php

namespace Database\Seeders;

use App\Models\ChatMessage;
use Illuminate\Database\Seeder;

class ChatMessageSeeder extends Seeder
{
    public function run(): void
    {
        $messages = [
            [
                'user_id' => 2,
                'role' => 'user',
                'message' => 'Halo SignBot, bagaimana cara mengucapkan "terima kasih" dalam bahasa isyarat?',
                'created_at' => now()->subDays(2),
            ],
            [
                'user_id' => 2,
                'role' => 'bot',
                'message' => 'Halo Ahmad! Untuk mengucapkan "terima kasih" dalam BISINDO, letakkan telapak tangan kanan di depan dada dan gerakkan ke depan sambil sedikit menunduk. Ini menunjukkan rasa hormat dan terima kasih.',
                'created_at' => now()->subDays(2)->addMinutes(1),
            ],
            [
                'user_id' => 2,
                'role' => 'user',
                'message' => 'Apakah ada pelajaran khusus untuk pemula?',
                'created_at' => now()->subDays(2)->addMinutes(5),
            ],
            [
                'user_id' => 2,
                'role' => 'bot',
                'message' => 'Tentu! Di Gerak Bicara, kami memiliki "Dasar Bahasa Isyarat Indonesia" yang sangat cocok untuk pemula. Mulai dari alfabet BISINDO, sapaan, sampai angka dasar. Rekomendasi saya: mulai dari Path 1 - Dasar Bahasa Isyarat Indonesia.',
                'created_at' => now()->subDays(2)->addMinutes(6),
            ],
            [
                'user_id' => 3,
                'role' => 'user',
                'message' => 'SignBot, saya kesulitan membedakan isyarat untuk "ayah" dan "ibu"',
                'created_at' => now()->subDays(1),
            ],
            [
                'user_id' => 3,
                'role' => 'bot',
                'message' => 'Halo Siti! Memang beberapa isyarat terlihat mirip. Untuk "ayah": kepalkan tangan kanan dan letakkan di dahi. Untuk "ibu": sentuh pipi kanan dengan telapak tangan kanan. Latihan terus menerus akan membantu Anda membedakannya!',
                'created_at' => now()->subDays(1)->addMinutes(1),
            ],
            [
                'user_id' => 4,
                'role' => 'user',
                'message' => 'Apa rekomendasi untuk meningkatkan kemampuan membaca isyarat?',
                'created_at' => now()->subHours(12),
            ],
            [
                'user_id' => 4,
                'role' => 'bot',
                'message' => 'Bagus sekali pertanyaan Anda, Budi! Untuk meningkatkan kemampuan membaca isyarat: 1) Tonton video pelan-pelan, 2) Latihan dengan cermin, 3) Minta teman yang bisa BISINDO untuk mengoreksi, 4) Gunakan fitur 3D di Gerak Bicara untuk melihat dari berbagai sudut.',
                'created_at' => now()->subHours(12)->addMinutes(1),
            ],
            [
                'user_id' => 5,
                'role' => 'user',
                'message' => 'SignBot, saya ingin membantu teman tuli saya. Apa yang harus saya pelajari dulu?',
                'created_at' => now()->subHours(6),
            ],
            [
                'user_id' => 5,
                'role' => 'bot',
                'message' => 'Terima kasih atas niat baik Anda, Maya! Sebagai pendukung inklusi, mulailah dengan: 1) Sapaan dasar (halo, terima kasih, maaf), 2) Pertanyaan umum (siapa, apa, di mana), 3) Kata kerja harian (makan, minum, tidur). Yang terpenting: bersikap sabar dan terus belajar bersama!',
                'created_at' => now()->subHours(6)->addMinutes(1),
            ],
        ];

        foreach ($messages as $message) {
            ChatMessage::create($message);
        }
    }
}
