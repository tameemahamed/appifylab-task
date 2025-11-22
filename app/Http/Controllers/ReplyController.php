<?php

namespace App\Http\Controllers;

use App\Models\Reply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReplyController extends Controller
{
    //
    public function addReply(Request $request) {
        // rules and validation
        $rules = [
            'comment_id' => 'required|exists:comments,id',
            'text' => 'required'
        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }

        // insert data
        Reply::create([
            'comment_id' => $request->comment_id,
            'user_id' => Auth::id(),
            'content' => $request->text,
            'created_at' => now()
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Reply created successfully'
        ], 201);

    }

    public function likeButton(Request $request) {
        $rules = [
            'reply_id' => 'required|exists:replies,id'
        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }

        Reply::addLike($request->reply_id);
    }
}
