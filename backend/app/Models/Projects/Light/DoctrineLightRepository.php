<?php

namespace App\Models\Projects\Light;


use App\Models\Projects\Light\Interfaces\LightRepositoryInterface;
use LaravelDoctrine\ORM\Facades\EntityManager;

class DoctrineLightRepository implements LightRepositoryInterface
{
    public function all(): array
    {
        return EntityManager::getRepository(Light::class)->findAll();
    }

    public function save(Light $light): void
    {
        EntityManager::persist($light);
        EntityManager::flush();
    }
}
