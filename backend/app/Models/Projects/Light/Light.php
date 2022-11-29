<?php

declare(strict_types=1);

namespace App\Models\Projects\Light;

use Carbon\CarbonImmutable;
use DateTimeImmutable;

class Light
{
    private int $id;
    private DateTimeImmutable $createdAt;
    private DateTimeImmutable $updatedAt;

    public function __construct(
        private bool $ledOn
    )
    {
        $this->createdAt = new CarbonImmutable('now');
        $this->updatedAt = new CarbonImmutable('now');
    }

    public function ledOn(): bool
    {
        return $this->ledOn;
    }

    public function id(): int
    {
        return $this->id;
    }
}
