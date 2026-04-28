<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Exception;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6',
            ]);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors()->first());
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'user',
            ]);

            $token = $user->createToken('api-token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Registration successful',
                'data' => [
                    'user' => $user,
                    'token' => $token,
                ],
            ], 201);
        } catch (Exception $exception) {
            return $this->exceptionResponse('Registration failed', $exception);
        }
    }

    public function login(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors()->first());
            }

            if (! Auth::attempt($request->only('email', 'password'))) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials',
                    'data' => null,
                ], 401);
            }

            $user = Auth::user();
            $token = $user->createToken('api-token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'data' => [
                    'user' => $user,
                    'token' => $token,
                ],
            ]);
        } catch (Exception $exception) {
            return $this->exceptionResponse('Login failed', $exception);
        }
    }

    public function logout(Request $request): JsonResponse
    {
        try {
            $request->user()?->currentAccessToken()?->delete();

            return response()->json([
                'success' => true,
                'message' => 'Logout successful',
                'data' => null,
            ]);
        } catch (Exception $exception) {
            return $this->exceptionResponse('Logout failed', $exception);
        }
    }

    public function me(Request $request): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'message' => 'User profile retrieved',
                'data' => ['user' => $request->user()],
            ]);
        } catch (Exception $exception) {
            return $this->exceptionResponse('Unable to retrieve profile', $exception);
        }
    }

    private function validationErrorResponse(string $message): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'data' => null,
        ], 422);
    }

    private function exceptionResponse(string $message, Exception $exception, int $status = 500): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'data' => null,
        ], $status);
    }
}
