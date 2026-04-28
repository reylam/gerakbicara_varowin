<?php

namespace Database\Seeders;

use App\Models\Sign;
use Illuminate\Database\Seeder;

class SignSeeder extends Seeder
{
    public function run(): void
    {
        $signs = [
            // Sapaan
            [
                'word' => 'Halo',
                'description' => 'Isyarat untuk menyapa atau mengatakan halo',
                'category' => 'Sapaan',
                'model_3d_url' => 'https://example.com/models/halo.glb',
                'video_url' => 'https://example.com/videos/halo.mp4',
            ],
            [
                'word' => 'Selamat Pagi',
                'description' => 'Isyarat untuk mengucapkan selamat pagi',
                'category' => 'Sapaan',
                'model_3d_url' => 'https://example.com/models/selamat-pagi.glb',
                'video_url' => 'https://example.com/videos/selamat-pagi.mp4',
            ],
            [
                'word' => 'Terima Kasih',
                'description' => 'Isyarat untuk mengucapkan terima kasih',
                'category' => 'Sapaan',
                'model_3d_url' => 'https://example.com/models/terima-kasih.glb',
                'video_url' => 'https://example.com/videos/terima-kasih.mp4',
            ],

            // Keluarga
            [
                'word' => 'Ayah',
                'description' => 'Isyarat untuk menyebut ayah atau bapak',
                'category' => 'Keluarga',
                'model_3d_url' => 'https://example.com/models/ayah.glb',
                'video_url' => 'https://example.com/videos/ayah.mp4',
            ],
            [
                'word' => 'Ibu',
                'description' => 'Isyarat untuk menyebut ibu atau mama',
                'category' => 'Keluarga',
                'model_3d_url' => 'https://example.com/models/ibu.glb',
                'video_url' => 'https://example.com/videos/ibu.mp4',
            ],
            [
                'word' => 'Kakak',
                'description' => 'Isyarat untuk menyebut kakak atau saudara laki-laki yang lebih tua',
                'category' => 'Keluarga',
                'model_3d_url' => 'https://example.com/models/kakak.glb',
                'video_url' => 'https://example.com/videos/kakak.mp4',
            ],

            // Angka
            [
                'word' => 'Satu',
                'description' => 'Isyarat untuk angka 1',
                'category' => 'Angka',
                'model_3d_url' => 'https://example.com/models/satu.glb',
                'video_url' => 'https://example.com/videos/satu.mp4',
            ],
            [
                'word' => 'Dua',
                'description' => 'Isyarat untuk angka 2',
                'category' => 'Angka',
                'model_3d_url' => 'https://example.com/models/dua.glb',
                'video_url' => 'https://example.com/videos/dua.mp4',
            ],
            [
                'word' => 'Lima',
                'description' => 'Isyarat untuk angka 5',
                'category' => 'Angka',
                'model_3d_url' => 'https://example.com/models/lima.glb',
                'video_url' => 'https://example.com/videos/lima.mp4',
            ],

            // Makanan
            [
                'word' => 'Makan',
                'description' => 'Isyarat untuk aktivitas makan',
                'category' => 'Aktivitas',
                'model_3d_url' => 'https://example.com/models/makan.glb',
                'video_url' => 'https://example.com/videos/makan.mp4',
            ],
            [
                'word' => 'Minum',
                'description' => 'Isyarat untuk aktivitas minum',
                'category' => 'Aktivitas',
                'model_3d_url' => 'https://example.com/models/minum.glb',
                'video_url' => 'https://example.com/videos/minum.mp4',
            ],

            // Perasaan
            [
                'word' => 'Senang',
                'description' => 'Isyarat untuk menyatakan perasaan senang',
                'category' => 'Perasaan',
                'model_3d_url' => 'https://example.com/models/senang.glb',
                'video_url' => 'https://example.com/videos/senang.mp4',
            ],
            [
                'word' => 'Sedih',
                'description' => 'Isyarat untuk menyatakan perasaan sedih',
                'category' => 'Perasaan',
                'model_3d_url' => 'https://example.com/models/sedih.glb',
                'video_url' => 'https://example.com/videos/sedih.mp4',
            ],
        ];

        foreach ($signs as $sign) {
            Sign::create($sign);
        }
    }
}
