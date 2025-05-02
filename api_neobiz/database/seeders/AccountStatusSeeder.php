<?php 

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AccountStatus;

class AccountStatusSeeder extends Seeder
{
    public function run(): void
    {
        AccountStatus::insert([
            ['name' => 'standard', 'description' => 'Compte gratuit', 'price' => 0],
            ['name' => 'professionnel', 'description' => 'Accès professionnel', 'price' => 9900],
            ['name' => 'full-option', 'description' => 'Toutes les fonctionnalités', 'price' => 14900],
        ]);
    }
}
