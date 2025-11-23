<?php

namespace App\Http\Controllers;

use App\Jobs\CreatePostJob;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use function Pest\Laravel\json;
use function PHPUnit\Framework\isNull;

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
        return Post::where('visibility', 1)
                    ->orWhere(function($q) {
                        $q->where('visibility', 0)
                          ->where('author_id', Auth::id());
                    })
                    ->with('author:id,name,display_picture_url')
                    ->with('lastComment.author:id,name,display_picture_url')
                    ->withExists('authLike')
                    ->withCount('likes')
                    ->withCount('comments')
                    ->latest()
                    ->paginate(5);
    }

    public function postInfo($post_id) {
        $userId = Auth::id();
        $post = Post::where('id', $post_id)
                        ->first();

        if($post === null) {
            return response()->json([
                'status' => 'not found'
            ], 404);
        }

        if($post->visibility == 0 && $post->author_id != $userId) {
            return response()->json([
                'status' => 'unauthorized'
            ], 401);
        }
        
        return Post::with('author:id,name,display_picture_url')
                    ->with('allComments.author:id,name,display_picture_url')
                    ->withExists('authLike')
                    ->withCount('likes')
                    ->withCount('comments')
                    ->where('id', $post_id)
                    ->first();
    }
}
