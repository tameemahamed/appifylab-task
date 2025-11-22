<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Reply extends Model
{
    //
    protected $fillable = [
        'comment_id',
        'user_id',
        'content'
    ];

    public static function addLike($replyId) {
        $userId = Auth::id();
        $liked = ReplyLike::where('user_id', $userId)
                    ->where('reply_id', $replyId)
                    ->exists();

        if($liked) {
            ReplyLike::where('user_id', $userId)
                ->where('reply_id', $replyId)
                ->delete();
        }

        else {
            ReplyLike::create([
                'user_id' => $userId,
                'reply_id' => $replyId
            ]);
        }
    }
}
