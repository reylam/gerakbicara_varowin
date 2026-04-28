<?php

namespace Database\Seeders;

use App\Models\Path;
use Illuminate\Database\Seeder;

class PathSeeder extends Seeder
{
    public function run(): void
    {
        $paths = [
            [
                'title' => 'Dasar Bahasa Isyarat Indonesia',
                'description' => 'Pelajari fondasi dasar BISINDO untuk komunikasi sehari-hari',
                'order' => 1,
            ],
            [
                'title' => 'Percakapan Sehari-hari',
                'description' => 'Kuasai isyarat untuk percakapan sosial dan interaksi harian',
                'order' => 2,
            ],
            [
                'title' => 'Konteks Pendidikan',
                'description' => 'Pelajari isyarat khusus untuk lingkungan pendidikan dan akademik',
                'order' => 3,
            ],
            [
                'title' => 'Konteks Profesional',
                'description' => 'Kuasai isyarat untuk komunikasi di lingkungan kerja',
                'order' => 4,
            ],
        ];

        foreach ($paths as $path) {
            Path::create($path);
        }
    }
}
