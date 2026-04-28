<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Achievement extends Model
{
    protected $fillable = ['title', 'description', 'xp_reward', 'icon'];

    public function userAchievements(): HasMany
    {
        return $this->hasMany(UserAchievement::class);
    }
}
