<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\AbstractController;
use App\Models\User\User;
use Illuminate\Http\JsonResponse;

class ListAllController extends AbstractController
{
    public function __invoke(): JsonResponse
    {

        $this->middleware('auth');

        return response()->json(User::all());
    }
}
