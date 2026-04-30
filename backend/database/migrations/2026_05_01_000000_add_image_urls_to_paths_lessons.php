<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('paths', function (Blueprint $table) {
            $table->string('cover_image_url')->nullable()->after('description');
        });

        Schema::table('lessons', function (Blueprint $table) {
            $table->string('thumbnail_url')->nullable()->after('content');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('paths', function (Blueprint $table) {
            $table->dropColumn('cover_image_url');
        });

        Schema::table('lessons', function (Blueprint $table) {
            $table->dropColumn('thumbnail_url');
        });
    }
};
