import useLike from "@/hooks/useLike";
import timeAgo from "@/utils/timeAgo";

export default function ReplyLayout({ reply }) {
    if (!reply) return null;

    const { isLiked, count: likesCount, loading, handleLike } = useLike(
        reply.auth_like_exists, 
        reply.likes_count, 
        '/api/reply-like-button'
    );

    const imageUrl = reply.author.display_picture_url
        ? `/${reply.author.display_picture_url}`
        : "/storage/dp/default.png";

    return (
        <div className="flex gap-3">
            <img src={imageUrl} alt={reply.author.name} className="w-8 h-8 rounded-full mt-1 flex-shrink-0" />
            <div className="flex-1 bg-gray-900/30 rounded-md p-2">
                <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{reply.author.name}</p>
                        <p className="text-sm text-gray-200 mt-1 whitespace-pre-wrap break-words">{reply.content}</p>
                        <p className="text-xs text-gray-400 mt-2">{timeAgo(reply.created_at)}</p>
                    </div>
                    <button
                        onClick={() => handleLike(reply.id)}
                        disabled={loading}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all ${
                            isLiked 
                                ? "bg-red-500/20 text-red-400" 
                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
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
    <svg className={`w-3.5 h-3.5 ${filled ? "text-red-500" : "text-gray-300"}`} 
         fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" 
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);
