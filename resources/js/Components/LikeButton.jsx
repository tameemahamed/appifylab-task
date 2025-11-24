import useLike from "@/hooks/useLike";

export default function LikeButton({ postId, likesCount = 0, liked = false }) {
    const { isLiked, count, loading, handleLike } = useLike(liked, likesCount, '/api/post-like-button');

    return (
        <button
            onClick={() => handleLike(postId)}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                isLiked 
                    ? "bg-red-500/20 text-red-400 border border-red-500/30" 
                    : "bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600"
            } ${loading ? "opacity-50" : "hover:scale-105"}`}
        >
            <HeartIcon filled={isLiked} />
            <span className="text-sm font-medium">{count}</span>
        </button>
    );
}

const HeartIcon = ({ filled }) => (
    <svg className={`w-5 h-5 ${filled ? "text-red-500" : "text-current"}`} 
         fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" 
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);
