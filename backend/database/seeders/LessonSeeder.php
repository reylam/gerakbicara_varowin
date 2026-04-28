<?php

namespace Database\Seeders;

use App\Models\Lesson;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
    public function run(): void
    {
        $lessons = [
            // Module 1: Alfabet BISINDO
            [
                'module_id' => 1,
                'title' => 'Huruf A-J',
                'content' => 'Pelajari bentuk isyarat untuk huruf A sampai J dalam alfabet BISINDO. Huruf-huruf ini merupakan dasar untuk membentuk kata-kata.',
                'difficulty' => 'easy',
                'order' => 1,
            ],
            [
                'module_id' => 1,
                'title' => 'Huruf K-T',
                'content' => 'Lanjutkan pembelajaran dengan huruf K sampai T. Perhatikan posisi jari dan gerakan yang tepat.',
                'difficulty' => 'easy',
                'order' => 2,
            ],
            [
                'module_id' => 1,
                'title' => 'Huruf U-Z',
                'content' => 'Selesaikan alfabet BISINDO dengan huruf U sampai Z. Praktikkan secara berulang untuk mengingat bentuknya.',
                'difficulty' => 'easy',
                'order' => 3,
            ],

            // Module 2: Sapaan dan Perkenalan
            [
                'module_id' => 2,
                'title' => 'Salam dan Halo',
                'content' => 'Pelajari cara mengucapkan salam dan halo dalam bahasa isyarat. Ini adalah isyarat pertama yang harus dikuasai.',
                'difficulty' => 'easy',
                'order' => 1,
            ],
            [
                'module_id' => 2,
                'title' => 'Perkenalan Diri',
                'content' => 'Pelajari isyarat untuk memperkenalkan nama dan asal. Kombinasikan dengan alfabet yang sudah dipelajari.',
                'difficulty' => 'easy',
                'order' => 2,
            ],
            [
                'module_id' => 2,
                'title' => 'Terima Kasih',
                'content' => 'Isyarat terima kasih adalah salah satu isyarat penting dalam komunikasi sehari-hari.',
                'difficulty' => 'easy',
                'order' => 3,
            ],

            // Module 3: Angka dan Waktu
            [
                'module_id' => 3,
                'title' => 'Angka 1-10',
                'content' => 'Pelajari isyarat untuk angka dasar dari 1 sampai 10. Angka ini sering digunakan dalam percakapan.',
                'difficulty' => 'easy',
                'order' => 1,
            ],
            [
                'module_id' => 3,
                'title' => 'Hari dalam Seminggu',
                'content' => 'Pelajari nama-nama hari dalam seminggu menggunakan bahasa isyarat.',
                'difficulty' => 'medium',
                'order' => 2,
            ],

            // Module 4: Keluarga dan Relasi
            [
                'module_id' => 4,
                'title' => 'Anggota Keluarga Inti',
                'content' => 'Pelajari isyarat untuk ayah, ibu, kakak, adik, dan anggota keluarga lainnya.',
                'difficulty' => 'easy',
                'order' => 1,
            ],
            [
                'module_id' => 4,
                'title' => 'Hubungan Sosial',
                'content' => 'Pelajari isyarat untuk teman, tetangga, dan berbagai hubungan sosial.',
                'difficulty' => 'medium',
                'order' => 2,
            ],

            // Module 5: Aktivitas Harian
            [
                'module_id' => 5,
                'title' => 'Makan dan Minum',
                'content' => 'Pelajari isyarat untuk aktivitas makan, minum, dan kegiatan terkait makanan.',
                'difficulty' => 'easy',
                'order' => 1,
            ],
            [
                'module_id' => 5,
                'title' => 'Tidur dan Istirahat',
                'content' => 'Pelajari isyarat untuk tidur, bangun, dan aktivitas istirahat lainnya.',
                'difficulty' => 'medium',
                'order' => 2,
            ],
        ];

        foreach ($lessons as $lesson) {
            Lesson::create($lesson);
        }
    }
}
