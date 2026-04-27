<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Path extends Model
{
    protected $fillable = ['title', 'description', 'order'];

    public function modules(): HasMany
    {
        return $this->hasMany(Module::class);
    }
}
