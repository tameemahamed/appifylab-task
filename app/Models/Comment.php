<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Comment extends Model
{
    //
    protected $fillable = [
        'post_id',
        'user_id',
        'content',
    ];

    public static function addLike($commentId) {
        $userId = Auth::id();
        $liked = CommentLike::where('user_id', $userId)
                    ->where('comment_id', $commentId)
                    ->exists();

        if($liked) {
            CommentLike::where('user_id', $userId)
                ->where('comment_id', $commentId)
                ->delete();
        }

        else {
            CommentLike::create([
                'user_id' => $userId,
                'comment_id' => $commentId
            ]);
        }
    }
}
