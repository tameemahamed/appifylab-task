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

    public function author() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function likes() {
        return $this->hasMany(ReplyLike::class);
    }

    public function authLike() {
        $userId = Auth::id() ?? 0;
        return $this->hasOne(ReplyLike::class)
                    ->where('user_id', $userId);
    }

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
