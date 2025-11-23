<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ReplyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function() {
    Route::post('add-post', [PostController::class, 'addPost']);
    Route::post('add-comment', [CommentController::class, 'addComment']);
    Route::post('add-reply', [ReplyController::class, 'addReply']);
    Route::post('post-like-button', [PostController::class, 'likeButton']);
    Route::post('comment-like-button', [CommentController::class, 'likeButton']);
    Route::post('reply-like-button', [ReplyController::class, 'likeButton']);
});

Route::middleware('auth:sanctum')->group(function() {
    Route::get('posts', [PostController::class, 'latestPosts']);
    Route::get('post/{post_id}', [PostController::class, 'postInfo']);
});