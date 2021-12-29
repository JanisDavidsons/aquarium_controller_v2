<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

class HomeController extends BaseController
{
    public function __invoke(Request $request): string
    {
        dd(DB::getPDO());
//        return DB::getPDO();
    }
}
