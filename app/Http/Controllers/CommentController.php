<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    //
    public function addComment(Request $request) {
        // rules and validation
        $rules = [
            'post_id' => 'required|exists:posts,id',
            'text' => 'required'
        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }

        Comment::create([
            'post_id' => $request->post_id,
            'user_id' => Auth::id(),
            'content' => $request->text,
            'created_at' => now()
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Comment created successfully'
        ], 201);

    }
}
