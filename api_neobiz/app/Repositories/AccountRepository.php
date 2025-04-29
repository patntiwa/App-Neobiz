<?php

namespace App\Repositories;

use App\Models\Account;

class AccountRepository
{
    public function findByEmail(string $email): ?Account
    {
        return Account::where('email', $email)->first();
    }
}
