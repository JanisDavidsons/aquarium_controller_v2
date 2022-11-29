<?php

declare(strict_types=1);

namespace App\Http\Controllers\Project\Light;

use App\Http\Controllers\AbstractController;
use App\Models\Projects\Light\Interfaces\LightRepositoryInterface;
use App\Models\Projects\Light\Light;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use function response;

class ViewLightController extends AbstractController
{
    public function __construct(
        private LightRepositoryInterface $repository,
    )
    {
    }

    public function __invoke(Request $request): JsonResponse
    {

//        $this->middleware('auth');

        $response = [];
        $lights    = $this->repository->all();

        /**
         * @var Light $light
         */
        foreach ($lights as $light){
            $response[] = [
                'id'     => $light->id(),
                'led_on' => $light->ledOn()
            ];
        }

        return response()->json($response);
    }
}
