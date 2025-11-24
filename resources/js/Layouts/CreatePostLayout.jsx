import { usePage } from "@inertiajs/react";
import { useState, useRef } from "react";
import axios from "axios";
import useAuthHeaders from "@/hooks/useAuthHeaders";

export default function CreatePostLayout() {
    const { auth: { user } } = usePage().props;
    const headers = useAuthHeaders();
    
    const [text, setText] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [visibility, setVisibility] = useState(1);
    const [loading, setLoading] = useState(false);
    const [visOpen, setVisOpen] = useState(false);
    const fileInputRef = useRef();

    const imageUrl = user?.display_picture_url 
        ? `/${user.display_picture_url}`
        : "/storage/dp/default.png";

    const handlePost = async (e) => {
        e.preventDefault();
        if (!text.trim()) {
            alert("Please enter some text for the post.");
            return;
        }

        const formData = new FormData();
        formData.append("text", text);
        if (imageFile) formData.append("image", imageFile);
        formData.append("visibility", visibility);

        try {
            setLoading(true);
            await axios.post("/api/add-post", formData, { 
                headers: { ...headers, "Accept": "application/json" } 
            });
            
            setText("");
            setImageFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (err) {
            console.error("Upload error:", err);
            alert(`Upload failed: ${err?.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const VisibilityDropdown = () => (
        <div className="relative">
            <button
                type="button"
                onClick={() => setVisOpen(!visOpen)}
                aria-expanded={visOpen}
                className="flex items-center gap-2 text-sm rounded-md border border-gray-600 px-2.5 py-1.5 bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
            >
                <span>{visibility === 1 ? "Public" : "Private"}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {visOpen && (
                <div className="absolute left-0 top-full mt-1 w-32 rounded-md bg-gray-700 border border-gray-600 shadow-xl z-10">
                    <button onClick={() => { setVisibility(1); setVisOpen(false); }} 
                            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-600">
                        Public
                    </button>
                    <button onClick={() => { setVisibility(0); setVisOpen(false); }} 
                            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-600">
                        Private
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className="w-full bg-gray-800 rounded-2xl border border-gray-700">
            <div className="p-4 md:p-5">
                <div className="flex gap-3">
                    <img src={imageUrl} alt="Profile" className="w-11 h-11 rounded-full bg-gray-700 flex-shrink-0 object-cover" />
                    <div className="flex-1">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="What's happening?"
                            className="w-full min-h-[72px] px-3 py-2 text-gray-100 placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                            rows={3}
                        />
                    </div>
                </div>

                {imageFile && (
                    <div className="mt-3 flex items-center gap-3">
                        <img
                            src={URL.createObjectURL(imageFile)}
                            alt="preview"
                            className="w-24 h-14 object-cover rounded-md border border-gray-700"
                        />
                        <div className="text-sm text-gray-300 truncate max-w-xs">{imageFile.name}</div>
                    </div>
                )}

                <div className="mt-3 flex justify-between items-center">
                    <div className="flex items-center gap-3 text-gray-400">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 hover:text-blue-400 hover:bg-blue-400/10 rounded-md transition-colors"
                            aria-label="Attach image"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </button>

                        <input type="file" accept="image/*" ref={fileInputRef} 
                               onChange={(e) => setImageFile(e.target.files?.[0])} className="hidden" />

                        <span className="text-sm text-gray-300 max-w-xs truncate">
                            {imageFile ? imageFile.name : ""}
                        </span>

                        <VisibilityDropdown />
                    </div>

                    <button
                        onClick={handlePost}
                        disabled={loading || !text.trim()}
                        className="px-4 py-1.5 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                    >
                        {loading ? "Posting..." : "Post"}
                    </button>
                </div>
            </div>
        </div>
    );
}
