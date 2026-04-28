<?php

namespace Database\Seeders;

use App\Models\Module;
use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    public function run(): void
    {
        $modules = [
            // Path 1: Dasar Bahasa Isyarat Indonesia
            [
                'path_id' => 1,
                'title' => 'Alfabet BISINDO',
                'description' => 'Pelajari alfabet manual BISINDO untuk membentuk kata',
                'order' => 1,
            ],
            [
                'path_id' => 1,
                'title' => 'Sapaan dan Perkenalan',
                'description' => 'Isyarat dasar untuk menyapa dan memperkenalkan diri',
                'order' => 2,
            ],
            [
                'path_id' => 1,
                'title' => 'Angka dan Waktu',
                'description' => 'Pelajari isyarat untuk angka dan konsep waktu',
                'order' => 3,
            ],

            // Path 2: Percakapan Sehari-hari
            [
                'path_id' => 2,
                'title' => 'Keluarga dan Relasi',
                'description' => 'Isyarat untuk menyebut anggota keluarga dan hubungan',
                'order' => 1,
            ],
            [
                'path_id' => 2,
                'title' => 'Aktivitas Harian',
                'description' => 'Isyarat untuk kegiatan sehari-hari seperti makan, minum, tidur',
                'order' => 2,
            ],
            [
                'path_id' => 2,
                'title' => 'Perasaan dan Emosi',
                'description' => 'Ekspresikan perasaan dan emosi melalui isyarat',
                'order' => 3,
            ],

            // Path 3: Konteks Pendidikan
            [
                'path_id' => 3,
                'title' => 'Lingkungan Sekolah',
                'description' => 'Isyarat khusus untuk situasi di sekolah',
                'order' => 1,
            ],
            [
                'path_id' => 3,
                'title' => 'Mata Pelajaran',
                'description' => 'Pelajari isyarat untuk berbagai mata pelajaran',
                'order' => 2,
            ],

            // Path 4: Konteks Profesional
            [
                'path_id' => 4,
                'title' => 'Komunikasi Kantor',
                'description' => 'Isyarat untuk situasi profesional di kantor',
                'order' => 1,
            ],
            [
                'path_id' => 4,
                'title' => 'Presentasi dan Rapat',
                'description' => 'Isyarat untuk presentasi dan diskusi formal',
                'order' => 2,
            ],
        ];

        foreach ($modules as $module) {
            Module::create($module);
        }
    }
}
