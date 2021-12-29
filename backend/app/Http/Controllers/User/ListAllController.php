<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\AbstractController;
use Illuminate\Http\JsonResponse;
use App\Models\User;

class ListAllController extends AbstractController
{
    public function __invoke(): JsonResponse
    {

        $this->middleware('auth');

        return response()->json(User::all());
    }
}
