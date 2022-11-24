<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\AbstractController;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use function response;

class RegisterController extends AbstractController
{
    public function __invoke(Request $request)
    {
        $this->validate($request, [
            'name'     => 'required|max:20',
            'email'    => 'required|email|max:50|unique:users',
            'password' => 'required|confirmed|min:6',
        ]);

        try {
            $user           = new User();
            $user->name     = $request->input('name');
            $user->email    = $request->input('email');
            $user->password = \app('hash')->make($request->input('password'));

            $user->save();

            return response()->json(['user'=>$user, 'message'=> 'CREATED'], 201);
        }catch (Exception $exception){
            return response()->json(['message' => 'User registration failed!'], 409);
        }
    }
}
