<?php

namespace App\Jobs;

use App\Models\Post;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CreatePostJob implements ShouldQueue
{
    use Queueable;

    public $userId, $text, $tempPath, $visibility;

    /**
     * Create a new job instance.
     */
    public function __construct($userId, $text, $tempPath = null, $visibility = 1)
    {
        //
        $this->userId = $userId;
        $this->text = $text;
        $this->tempPath = $tempPath;
        $this->visibility = $visibility;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        //
        $path = null;

        if($this->tempPath && Storage::disk('local')->exists($this->tempPath)) {
            $filename = Str::random(6).'_'. basename($this->tempPath);
            $path = 'posts/'.$filename;

            $contents = Storage::disk('local')->get($this->tempPath);
            Storage::disk('public')->put($path, $contents);

            Storage::disk('local')->delete($this->tempPath);
        }

        Post::create([
            'author_id' => $this->userId,
            'content' => $this->text,
            'image_url' => $path,
            'visibility' => $this->visibility,
            'created_at' => now()
        ]);
    }
}
