<?php

namespace App\Models\User;

use LaravelDoctrine\ORM\Facades\EntityManager;

class DoctrineUserRepository implements UserRepositoryInterface
{
    public function save(User $user): void
    {
        EntityManager::persist($user);
        EntityManager::flush();
    }
}
