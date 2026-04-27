<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserQuizAttempt extends Model
{
    protected $fillable = ['user_id', 'quiz_id', 'selected_answer_id', 'is_correct'];

    protected $casts = [
        'is_correct' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }

    public function selectedAnswer(): BelongsTo
    {
        return $this->belongsTo(QuizAnswer::class, 'selected_answer_id');
    }
}
