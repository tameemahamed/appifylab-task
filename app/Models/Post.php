<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    //
    protected $fillable = [
        'author_id',
        'content',
        'image_url',
        'visibility',
    ];

    public static function addLike($postId) {
        $userId = Auth::id();
        $liked = PostLike::where('user_id', $userId)
                    ->where('post_id', $postId)
                    ->exists();

        if($liked) {
            PostLike::where('user_id', $userId)
                ->where('post_id', $postId)
                ->delete();
        }

        else {
            PostLike::create([
                'user_id' => $userId,
                'post_id' => $postId
            ]);
        }
    } 
}
