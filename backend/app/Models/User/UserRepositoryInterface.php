<?php

namespace App\Models\User;

interface UserRepositoryInterface
{
    public function save(User $user): void;
}
