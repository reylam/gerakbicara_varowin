<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Administrator Gerak Bicara',
            'email' => 'admin@gerakbicara.id',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'xp' => 0,
            'level' => 0,
        ]);

        // Create sample regular users
        $users = [
            [
                'name' => 'Ahmad Rahman',
                'email' => 'ahmad@example.com',
                'password' => Hash::make('password'),
                'xp' => 150,
                'level' => 1,
            ],
            [
                'name' => 'Siti Nurhaliza',
                'email' => 'siti@example.com',
                'password' => Hash::make('password'),
                'xp' => 320,
                'level' => 3,
            ],
            [
                'name' => 'Budi Santoso',
                'email' => 'budi@example.com',
                'password' => Hash::make('password'),
                'xp' => 85,
                'level' => 0,
            ],
            [
                'name' => 'Maya Sari',
                'email' => 'maya@example.com',
                'password' => Hash::make('password'),
                'xp' => 450,
                'level' => 4,
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
