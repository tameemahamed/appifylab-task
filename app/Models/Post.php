<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'author_id',
        'content',
        'image_url',
        'visibility',
    ];

    public function author() {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function likes() {
        return $this->hasMany(PostLike::class);
    }

    public function authLike() {
        $userId = Auth::id() ?? 0;
        return $this->hasOne(PostLike::class)
                    ->where('user_id', $userId);
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function lastComment(){
        return $this->hasOne(Comment::class)
                ->latestOfMany()
                ->withCount('likes')
                ->withExists('authLike');
    }

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
