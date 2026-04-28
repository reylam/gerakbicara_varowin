<?php

namespace App\Http\Controllers\SignBot;

use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Exception;

class SignBotController extends Controller
{
    public function history(Request $request): JsonResponse
    {
        try {
            $messages = ChatMessage::where('user_id', $request->user()->id)
                ->orderByDesc('created_at')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Chat history retrieved',
                'data' => $messages,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve chat history',
                'data' => null,
            ], 500);
        }
    }

    public function sendMessage(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'message' => 'required|string|max:2000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->errors()->first(),
                    'data' => null,
                ], 422);
            }

            $result = DB::transaction(function () use ($request) {
                $userMessage = ChatMessage::create([
                    'user_id' => $request->user()->id,
                    'role' => 'user',
                    'message' => $request->message,
                ]);

                $botMessage = ChatMessage::create([
                    'user_id' => $request->user()->id,
                    'role' => 'bot',
                    'message' => $this->generateBotReply($request->message),
                ]);

                return [
                    'user_message' => $userMessage,
                    'bot_message' => $botMessage,
                ];
            });

            return response()->json([
                'success' => true,
                'message' => 'Message stored successfully',
                'data' => $result,
            ], 201);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to store message',
                'data' => null,
            ], 500);
        }
    }

    private function generateBotReply(string $message): string
    {
        return 'Bot: Terima kasih! Saya memahami pesan Anda dan akan membantu Anda segera.';
    }
}
