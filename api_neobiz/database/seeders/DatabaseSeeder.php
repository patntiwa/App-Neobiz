<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Account;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $roles = [
            'super_admin',
            'admin',
            'freelancer',
            'client',
            'accountant',
            'project_manager',
            'support_agent',
            'guest',
        ];

        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }

        $account = Account::create([
            'name' => 'Patrick Ntiwa',
            'email' => 'patntiwa19@gmaiil.com',
            'password' => Hash::make('Linux2p@t'),
            'is_active' => true,
        ]);

        $account->roles()->attach(Role::where('name', 'super_admin')->first());

        // Tu peux ajouter d'autres comptes de test ici aussi !
    }
}
