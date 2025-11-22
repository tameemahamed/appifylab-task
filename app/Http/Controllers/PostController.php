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
            'text'   => 'required|string|max:5000',
            'image'     => 'nullable|image|mimes:png,jpg,jpeg|max:4096',
            'visibility'=> 'required|boolean',
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

        if($request->hasFile('iamge')) {
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
}
