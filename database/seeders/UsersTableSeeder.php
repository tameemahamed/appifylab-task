<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        for($i=0; $i<9; $i++) {
            $fname = fake()->firstName();
            $lname = fake()->lastName();
            $name = $fname.' '.$lname;
            $mail = ['yahoo', 'gmail', 'hotmail'];
            $username = str_replace(' ', '', strtolower($name));
            $email = $username.rand(1,99).'@'.$mail[array_rand($mail)].'.com';
            
            DB::table('users')->insert([                
                'name' => $name,
                'email' => $email,
                'email_verified_at' => now(),
                'display_picture_url' => 'storage/app/public/dp/f'.($i+1).'.png',
                'password' => Hash::make('password'),
                'created_at' => now()
            ]);
        }
    }
}
