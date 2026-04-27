<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Challenge extends Model
{
    protected $fillable = ['title', 'description', 'xp_reward'];

    public function userChallenges(): HasMany
    {
        return $this->hasMany(UserChallenge::class);
    }
}
