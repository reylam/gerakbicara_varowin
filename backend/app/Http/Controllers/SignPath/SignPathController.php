<?php

namespace App\Http\Controllers\SignPath;

use App\Models\Module;
use App\Models\Path;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Exception;

class SignPathController extends Controller
{
    // User methods
    public function allPaths(): JsonResponse
    {
        try {
            $paths = Path::with(['modules' => function ($query) {
                $query->orderBy('order')->withCount('lessons');
            }])->orderBy('order')->get();

            return response()->json([
                'success' => true,
                'message' => 'Sign paths retrieved',
                'data' => $paths,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve sign paths',
                'data' => null,
            ], 500);
        }
    }

    public function modulesByPath(int $pathId): JsonResponse
    {
        try {
            $modules = Module::withCount('lessons')
                ->where('path_id', $pathId)
                ->orderBy('order')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Path modules retrieved',
                'data' => $modules,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve modules for path',
                'data' => null,
            ], 500);
        }
    }

    public function lessonsByModule(int $moduleId): JsonResponse
    {
        try {
            $lessons = Lesson::select('id', 'module_id', 'title', 'order')
                ->where('module_id', $moduleId)
                ->orderBy('order')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Module lessons retrieved',
                'data' => $lessons,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve lessons for module',
                'data' => null,
            ], 500);
        }
    }

    // Admin CRUD methods for paths
    public function index(): JsonResponse
    {
        try {
            $paths = Path::with('modules')->orderBy('order')->get();

            return response()->json([
                'success' => true,
                'message' => 'Paths retrieved',
                'data' => $paths,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve paths',
                'data' => null,
            ], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'order' => 'required|integer|min:0',
            ]);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors()->first());
            }

            $path = Path::create($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Path created',
                'data' => $path,
            ], 201);
        } catch (Exception $exception) {
            return $this->exceptionResponse('Path creation failed', $exception);
        }
    }

    public function show(Path $path): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'message' => 'Path retrieved',
                'data' => $path->load('modules'),
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve path',
                'data' => null,
            ], 500);
        }
    }

    public function update(Request $request, Path $path): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'order' => 'required|integer|min:0',
            ]);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors()->first());
            }

            $path->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Path updated',
                'data' => $path,
            ]);
        } catch (Exception $exception) {
            return $this->exceptionResponse('Path update failed', $exception);
        }
    }

    public function destroy(Path $path): JsonResponse
    {
        try {
            $path->delete();

            return response()->json([
                'success' => true,
                'message' => 'Path deleted',
                'data' => null,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to delete path',
                'data' => null,
            ], 500);
        }
    }

    // Admin CRUD methods for modules
    public function modulesIndex(): JsonResponse
    {
        try {
            $modules = Module::with('path')->orderBy('order')->get();

            return response()->json([
                'success' => true,
                'message' => 'Modules retrieved',
                'data' => $modules,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve modules',
                'data' => null,
            ], 500);
        }
    }

    public function storeModule(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'path_id' => 'required|integer|exists:paths,id',
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'order' => 'required|integer|min:0',
            ]);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors()->first());
            }

            $module = Module::create($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Module created',
                'data' => $module,
            ], 201);
        } catch (Exception $exception) {
            return $this->exceptionResponse('Module creation failed', $exception);
        }
    }

    public function showModule(Module $module): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'message' => 'Module retrieved',
                'data' => $module->load('path'),
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve module',
                'data' => null,
            ], 500);
        }
    }

    public function updateModule(Request $request, Module $module): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'path_id' => 'required|integer|exists:paths,id',
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'order' => 'required|integer|min:0',
            ]);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors()->first());
            }

            $module->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Module updated',
                'data' => $module,
            ]);
        } catch (Exception $exception) {
            return $this->exceptionResponse('Module update failed', $exception);
        }
    }

    public function destroyModule(Module $module): JsonResponse
    {
        try {
            $module->delete();

            return response()->json([
                'success' => true,
                'message' => 'Module deleted',
                'data' => null,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to delete module',
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
