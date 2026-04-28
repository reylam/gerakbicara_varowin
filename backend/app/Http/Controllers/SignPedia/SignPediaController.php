<?php

namespace App\Http\Controllers\SignPedia;

use App\Models\Sign;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Exception;

class SignPediaController extends Controller
{
    public function allSigns(Request $request): JsonResponse
    {
        try {
            $signs = Sign::select(['id', 'word', 'description', 'category', 'model_3d_url', 'video_url'])
                ->orderBy('word')
                ->paginate(15);

            return response()->json([
                'success' => true,
                'message' => 'Signs retrieved',
                'data' => $signs,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve signs',
                'data' => null,
            ], 500);
        }
    }

    public function search(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'q' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->errors()->first(),
                    'data' => null,
                ], 422);
            }

            $query = $request->q;
            $signs = Sign::select(['id', 'word', 'description', 'category', 'model_3d_url', 'video_url'])
                ->where('word', 'like', "%{$query}%")
                ->orWhere('category', 'like', "%{$query}%")
                ->orderBy('word')
                ->paginate(15);

            return response()->json([
                'success' => true,
                'message' => 'Search results retrieved',
                'data' => $signs,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to perform search',
                'data' => null,
            ], 500);
        }
    }

    // Admin CRUD methods for signs
    public function index(): JsonResponse
    {
        try {
            $signs = Sign::orderBy('word')->get();

            return response()->json([
                'success' => true,
                'message' => 'Signs retrieved',
                'data' => $signs,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve signs',
                'data' => null,
            ], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'word' => 'required|string|max:255|unique:signs,word',
                'description' => 'required|string',
                'category' => 'required|string|max:255',
                'model_3d_url' => 'nullable|url',
                'video_url' => 'nullable|url',
                'difficulty_level' => 'nullable|integer|min:1|max:5',
            ]);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors()->first());
            }

            $sign = Sign::create($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Sign created',
                'data' => $sign,
            ], 201);
        } catch (Exception $exception) {
            return $this->exceptionResponse('Sign creation failed', $exception);
        }
    }

    public function show(Sign $sign): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'message' => 'Sign retrieved',
                'data' => $sign,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve sign',
                'data' => null,
            ], 500);
        }
    }

    public function update(Request $request, Sign $sign): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'word' => 'required|string|max:255|unique:signs,word,' . $sign->id,
                'description' => 'required|string',
                'category' => 'required|string|max:255',
                'model_3d_url' => 'nullable|url',
                'video_url' => 'nullable|url',
                'difficulty_level' => 'nullable|integer|min:1|max:5',
            ]);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors()->first());
            }

            $sign->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Sign updated',
                'data' => $sign,
            ]);
        } catch (Exception $exception) {
            return $this->exceptionResponse('Sign update failed', $exception);
        }
    }

    public function destroy(Sign $sign): JsonResponse
    {
        try {
            $sign->delete();

            return response()->json([
                'success' => true,
                'message' => 'Sign deleted',
                'data' => null,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to delete sign',
                'data' => null,
            ], 500);
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

    private function exceptionResponse(string $message, Exception $exception): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'data' => null,
        ], 500);
    }
}
