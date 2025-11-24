import { useState } from "react";
import { usePage } from "@inertiajs/react";
import useAuthHeaders from "@/hooks/useAuthHeaders";

export function ReplyInputArea({ commentId = null }) {
    const { auth: { user } } = usePage().props;
    const headers = useAuthHeaders();
    
    const [body, setBody] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!body.trim() || submitting) return;
        setSubmitting(true);

        try {
            await fetch("/api/add-reply", {
                method: "POST",
                headers: { ...headers, "Content-Type": "application/json" },
                body: JSON.stringify({ comment_id: commentId, text: body }),
            });
            setBody("");
        } catch (err) {
            console.error("Add reply failed:", err);
        } finally {
            setSubmitting(false);
        }
    };

    const avatarUrl = user?.display_picture_url || 'storage/dp/default.png';

    return (
        <div className="flex gap-3 items-start">
            <img src={`/${avatarUrl}`} alt={user.name} className="w-8 h-8 rounded-full flex-shrink-0 object-cover" />
            <div className="flex-1">
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Write a reply..."
                    rows={2}
                    className="w-full bg-gray-900/40 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <div className="flex justify-end mt-2">
                    <button
                        onClick={handleSubmit}
                        disabled={submitting || !body.trim()}
                        className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                        {submitting ? "Replying..." : "Reply"}
                    </button>
                </div>
            </div>
        </div>
    );
}
