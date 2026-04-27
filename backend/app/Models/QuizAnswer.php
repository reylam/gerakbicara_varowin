<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class QuizAnswer extends Model
{
    protected $fillable = ['quiz_id', 'answer', 'is_correct'];

    protected $casts = [
        'is_correct' => 'boolean',
    ];

    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }

    public function userQuizAttempts(): HasMany
    {
        return $this->hasMany(UserQuizAttempt::class, 'selected_answer_id');
    }
}
