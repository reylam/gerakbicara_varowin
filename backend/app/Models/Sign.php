<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sign extends Model
{
    protected $table = 'signs';

    protected $fillable = ['word', 'description', 'category', 'model_3d_url', 'video_url'];
}
