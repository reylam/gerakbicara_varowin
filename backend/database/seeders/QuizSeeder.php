<?php

namespace Database\Seeders;

use App\Models\Quiz;
use App\Models\QuizAnswer;
use Illuminate\Database\Seeder;

class QuizSeeder extends Seeder
{
    public function run(): void
    {
        // Quiz for lesson 1 (Huruf A-J)
        $quiz1 = Quiz::create([
            'lesson_id' => 1,
            'question' => 'Manakah isyarat yang benar untuk huruf "A"?',
            'type' => 'mcq',
        ]);

        QuizAnswer::create(['quiz_id' => $quiz1->id, 'answer' => 'Jari telunjuk menunjuk ke atas', 'is_correct' => false]);
        QuizAnswer::create(['quiz_id' => $quiz1->id, 'answer' => 'Tangan mengepal seperti tinju', 'is_correct' => true]);
        QuizAnswer::create(['quiz_id' => $quiz1->id, 'answer' => 'Jari-jari direntangkan lebar', 'is_correct' => false]);

        // Quiz for lesson 2 (Huruf K-T)
        $quiz2 = Quiz::create([
            'lesson_id' => 2,
            'question' => 'Huruf "K" dalam BISINDO dibentuk dengan cara:',
            'type' => 'mcq',
        ]);

        QuizAnswer::create(['quiz_id' => $quiz2->id, 'answer' => 'Jari telunjuk dan jempol membentuk lingkaran', 'is_correct' => true]);
        QuizAnswer::create(['quiz_id' => $quiz2->id, 'answer' => 'Tangan mengepal penuh', 'is_correct' => false]);
        QuizAnswer::create(['quiz_id' => $quiz2->id, 'answer' => 'Jari kelingking dilipat', 'is_correct' => false]);

        // Quiz for lesson 4 (Salam dan Halo)
        $quiz3 = Quiz::create([
            'lesson_id' => 4,
            'question' => 'Apakah gerakan isyarat "halo" melibatkan gerakan tangan?',
            'type' => 'gesture',
        ]);

        QuizAnswer::create(['quiz_id' => $quiz3->id, 'answer' => 'Ya, tangan digerakkan ke depan dada', 'is_correct' => true]);
        QuizAnswer::create(['quiz_id' => $quiz3->id, 'answer' => 'Tidak, cukup dengan ekspresi wajah saja', 'is_correct' => false]);

        // Quiz for lesson 5 (Perkenalan Diri)
        $quiz4 = Quiz::create([
            'lesson_id' => 5,
            'question' => 'Untuk memperkenalkan nama dalam BISINDO, kita harus:',
            'type' => 'mcq',
        ]);

        QuizAnswer::create(['quiz_id' => $quiz4->id, 'answer' => 'Menunjuk ke dada sambil menyebut nama', 'is_correct' => true]);
        QuizAnswer::create(['quiz_id' => $quiz4->id, 'answer' => 'Menunjuk ke orang lain', 'is_correct' => false]);
        QuizAnswer::create(['quiz_id' => $quiz4->id, 'answer' => 'Menggelengkan kepala', 'is_correct' => false]);

        // Quiz for lesson 7 (Angka 1-10)
        $quiz5 = Quiz::create([
            'lesson_id' => 7,
            'question' => 'Angka "5" dalam BISINDO ditunjukkan dengan:',
            'type' => 'mcq',
        ]);

        QuizAnswer::create(['quiz_id' => $quiz5->id, 'answer' => 'Semua jari direntangkan lebar', 'is_correct' => true]);
        QuizAnswer::create(['quiz_id' => $quiz5->id, 'answer' => 'Hanya jari kelingking yang dilipat', 'is_correct' => false]);
        QuizAnswer::create(['quiz_id' => $quiz5->id, 'answer' => 'Tangan mengepal', 'is_correct' => false]);
    }
}
