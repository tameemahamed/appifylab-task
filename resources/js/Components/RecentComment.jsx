import useLike from "@/hooks/useLike";
import timeAgo from "@/utils/timeAgo";

export default function RecentComment({ comment }) {
    if (!comment) return null;

    const { isLiked, count: likesCount, loading, handleLike } = useLike(
        comment.auth_like_exists, 
        comment.likes_count, 
        '/api/comment-like-button'
    );

    const imageUrl = comment.author.display_picture_url
        ? `/${comment.author.display_picture_url}`
        : "/storage/dp/default.png";

    return (
        <div className="flex gap-3 items-start bg-gray-900/40 p-3 rounded-lg border border-gray-700">
            <img src={imageUrl} alt={comment.author.name} className="w-8 h-8 rounded-full flex-shrink-0 object-cover" />
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div className="min-w-0">
                        <p className="font-medium text-white text-sm truncate">{comment.author.name}</p>
                        <p className="text-gray-200 text-sm mt-1 whitespace-pre-wrap break-words">{comment.content}</p>
                        <p className="text-gray-400 text-xs mt-1">{timeAgo(comment.created_at)}</p>
                    </div>
                    <button
                        onClick={() => handleLike(comment.id)}
                        disabled={loading}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                            isLiked ? "bg-red-500/20 text-red-400" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        } ${loading ? "opacity-50" : ""}`}
                    >
                        <HeartIcon filled={isLiked} />
                        <span>{likesCount}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

const HeartIcon = ({ filled }) => (
    <svg className={`w-3 h-3 ${filled ? "text-red-500" : "text-current"}`} 
         fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" 
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);
