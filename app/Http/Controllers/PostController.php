<?php

namespace App\Http\Controllers;

use App\Jobs\CreatePostJob;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    //
    public function addPost(Request $request) {
        // rules and validation
        
        $rules = [
            'text' => 'required|string|max:5000',
            'image' => 'nullable|image|mimes:png,jpg,jpeg|max:4096',
            'visibility' => 'required|boolean',
        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }

        // store image and create post
        $tempPath = null;

        if($request->hasFile('image')) {
            $tempPath = $request->file('image')->store('temp');
        }

        CreatePostJob::dispatch(
            Auth::id(),
            $request->text,
            $tempPath,
            $request->visibility
        );

        return response()->json([
            'status' => 'accepted',
            'message' => 'Post is being created.',
        ], 202);
    }

    public function likeButton(Request $request) {
        $rules = [
            'post_id' => 'required|exists:posts,id'
        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }
        
        Post::addLike($request->post_id);
    }

    public function latestPosts(Request $request) {
        return Post::with('author:id,name,display_picture_url')
                    ->with('lastComment.author:id,name,display_picture_url')
                    ->withExists('authLike')
                    ->withCount('likes')
                    ->withCount('comments')
                    ->latest()
                    ->paginate(5);
    }

    public function postInfo($post_id) {
        return Post::with('author:id,name,display_picture_url')
                    ->with('allComments.author:id,name,display_picture_url')
                    ->withExists('authLike')
                    ->withCount('likes')
                    ->withCount('comments')
                    ->where('id', $post_id)
                    ->first();
    }
}
