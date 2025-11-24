import LikeButton from "@/Components/LikeButton";
import CommentButton from "@/Components/CommentButton";
import timeAgo from "@/utils/timeAgo";

export default function PostLayout({ post, author, children = null }) {
    const imageUrl = author?.display_picture_url 
        ? `/${author.display_picture_url}`
        : "/storage/dp/default.png";

    return (
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-4 shadow-md">
            <div className="flex items-start gap-4">
                <img src={imageUrl} className="w-12 h-12 rounded-full flex-shrink-0 object-cover" alt={author.name} />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-white leading-tight">{author.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{timeAgo(post.created_at)}</p>
                        </div>
                        {/* keep action placeholder or other header controls in future */}
                    </div>

                    <p className="text-gray-200 mt-3 whitespace-pre-wrap break-words text-sm">{post.content}</p>

                    {post.image_url && (
                        <div className="w-full mt-3 rounded-lg overflow-hidden">
                            <img src={`/${post.image_url}`} className="w-full object-cover rounded-lg max-h-[420px]" alt="Post" />
                        </div>
                    )}

                    <div className="flex gap-3 pt-4 items-center">
                        <LikeButton 
                            postId={post.id} 
                            likesCount={post.likes_count} 
                            liked={post.auth_like_exists} 
                        />
                        <CommentButton 
                            postId={post.id} 
                            commentsCount={post.comments_count} 
                        />

                        <div className="ml-auto text-sm text-gray-400">
                            {post.comments_count} Comment{post.comments_count !== 1 ? "s" : ""} · {post.likes_count} Likes
                        </div>
                    </div>

                    {/* children (comment input / recent comment / replies) appear inside the card */}
                    {children && (
                        <div className="mt-4 border-t border-gray-700 pt-4">
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
