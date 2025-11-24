import ReplyLayout from "@/Layouts/ReplyLayout";
import { ReplyInputArea } from "@/Components/ReplyInputArea";
import useLike from "@/hooks/useLike";
import timeAgo from "@/utils/timeAgo";

export default function CommentLayout({ comment, allComments = [], replies = null }) {
    if (!comment) return null;

    const { isLiked, count: likesCount, loading, handleLike } = useLike(
        comment.auth_like_exists, 
        comment.likes_count, 
        '/api/comment-like-button'
    );

    const imageUrl = comment.author.display_picture_url 
        ? `/${comment.author.display_picture_url}`
        : "/storage/dp/default.png";

    const repliesList = replies ?? comment.all_replies ?? [];

    return (
        <div className="bg-gray-800/50 rounded-lg p-3 mb-3 border border-gray-700">
            <div className="flex gap-3">
                <img src={imageUrl} alt={comment.author.name} className="w-10 h-10 rounded-full flex-shrink-0 object-cover" />
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                        <div className="min-w-0">
                            <p className="font-semibold text-white text-sm">{comment.author.name}</p>
                            <p className="text-gray-200 mt-1 text-sm whitespace-pre-wrap break-words">{comment.content}</p>
                            <p className="text-xs text-gray-400 mt-2">{timeAgo(comment.created_at)}</p>
                        </div>
                        <LikeButton 
                            isLiked={isLiked} 
                            likesCount={likesCount} 
                            loading={loading} 
                            onClick={() => handleLike(comment.id)} 
                        />
                    </div>

                    {repliesList.length > 0 && (
                        <div className="mt-3 space-y-2 pl-12">
                            {repliesList.map(reply => (
                                <ReplyLayout key={reply.id} reply={reply} />
                            ))}
                        </div>
                    )}

                    <div className="mt-2 pl-12">
                        <ReplyInputArea commentId={comment.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const LikeButton = ({ isLiked, likesCount, loading, onClick }) => (
    <button
        onClick={onClick}
        disabled={loading}
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-all ${
            isLiked 
                ? "bg-red-500/20 text-red-400 border border-red-500/30" 
                : "bg-gray-700/40 text-gray-300 border border-gray-600/30 hover:bg-gray-700/60"
        } ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
    >
        <HeartIcon filled={isLiked} />
        <span>{likesCount}</span>
    </button>
);

const HeartIcon = ({ filled }) => (
    <svg className={`w-4 h-4 ${filled ? "text-red-500" : "text-gray-300"}`} fill={filled ? "currentColor" : "none"} 
         stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" 
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);
