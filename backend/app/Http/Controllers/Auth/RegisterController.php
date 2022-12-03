<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\AbstractController;
use App\Models\User\User;
use App\Models\User\UserRepositoryInterface;
use Exception;
use Illuminate\Http\Request;
use function response;

class RegisterController extends AbstractController
{
    public function __construct(private UserRepositoryInterface $repository)
    {
    }

    public function __invoke(Request $request)
    {
        $this->validate($request, [
            'name'     => 'required|max:20',
            'email'    => 'required|email|max:50|unique:App\Models\User\User,email',
            'password' => 'required|confirmed|min:6',
        ]);

        try {
            $name     = $request->input('name');
            $email    = $request->input('email');
            $password = app('hash')->make($request->input('password'));
            $user     = new User($name, $email, $password);

            $this->repository->save($user);

            return response()->json(['user'=>$user, 'message'=> 'CREATED'], 201);
        }catch (Exception){
            return response()->json(['message' => 'User registration failed!'], 409);
        }
    }
}
