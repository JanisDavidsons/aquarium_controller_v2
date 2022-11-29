<?php

namespace App\Http\Controllers\Project\Light;

use App\Http\Controllers\AbstractController;
use App\Models\Projects\Light\Interfaces\LightRepositoryInterface;
use App\Models\Projects\Light\Light;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CreateLightController extends AbstractController
{
    public function __construct(
        private LightRepositoryInterface $repository,
    )
    {
    }

    public function __invoke(Request $request): Response
    {
//        $this->middleware('auth');

        $payload = $request->all();
        $light   = new Light($payload['led_on']);

        $this->repository->save($light);

        return new Response('', 201);
    }
}
