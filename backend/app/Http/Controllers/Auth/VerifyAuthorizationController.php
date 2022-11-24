<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\AbstractController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class VerifyAuthorizationController extends AbstractController
{
    public function __invoke(Request $request): Response
    {
        $this->middleware('auth');

        return new Response();
    }
}
