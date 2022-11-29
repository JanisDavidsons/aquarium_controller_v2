<?php

namespace App\Models\Projects\Light\Interfaces;

use App\Models\Projects\Light\Light;

Interface LightRepositoryInterface
{
    public function all(): array;

    public function save(Light $light): void;
}
