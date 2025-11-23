<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Comment extends Model
{
    //
    use HasFactory;

    public function post() {
        return $this->belongsTo(Post::class);
    }

    public function author() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function likes() {
        return $this->hasMany(CommentLike::class);
    }

    public function authLike() {
        $userId = Auth::id() ?? 0;
        return $this->hasOne(CommentLike::class)
                    ->where('user_id', $userId);
    }

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
