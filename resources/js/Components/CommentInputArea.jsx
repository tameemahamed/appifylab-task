import { useState } from "react";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import useAuthHeaders from "@/hooks/useAuthHeaders";

export default function CommentInputArea({ postId }) {
    const { auth: { user } } = usePage().props;
    const headers = useAuthHeaders();
    
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!text.trim() || loading) return;
        setLoading(true);

        try {
            await axios.post("/api/add-comment", { post_id: postId, text }, { headers });
            setText("");
        } catch (error) {
            console.error("Error adding comment:", error);
        } finally {
            setLoading(false);
        }
    };

    const imageUrl = user?.display_picture_url
        ? `/${user.display_picture_url}`
        : "/storage/dp/default.png";

    return (
        <div className="flex gap-3 items-start">
            <img src={imageUrl} alt={user.name} className="w-9 h-9 rounded-full flex-shrink-0 object-cover" />
            <div className="flex-1">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write a comment..."
                    rows={2}
                    className="w-full bg-gray-900/40 text-gray-100 placeholder-gray-400 p-3 rounded-xl border border-gray-700 focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                />
                <div className="flex justify-end mt-2">
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !text.trim()}
                        className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
                    >
                        {loading ? "Posting..." : "Post"}
                    </button>
                </div>
            </div>
        </div>
    );
}
