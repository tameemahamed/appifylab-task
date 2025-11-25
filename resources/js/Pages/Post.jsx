import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PostLayout from '@/Layouts/PostLayout';
import CommentLayout from '@/Layouts/CommentLayout';
import CommentInputArea from '@/Components/CommentInputArea';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import useAuthHeaders from '@/hooks/useAuthHeaders';

export default function Post() {
    const page = usePage();
    const headers = useAuthHeaders();
    
    const getPostId = () => page.props?.post_id ?? page.props?.postId ?? 
        (window.location.pathname.match(/\/post\/(\d+)/)?.[1] || null);

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const postId = getPostId();

    useEffect(() => {
        let mounted = true;

        if (!postId) {
            setError('Post ID not found.');
            setLoading(false);
            return;
        }

        const fetchPost = async () => {
            try {
                const { data } = await axios.get(`/api/post/${postId}`, { headers });
                if (mounted) setPost(data);
            } catch (err) {
                console.error('Failed to fetch post:', err);
                if (mounted) setError(err?.response?.data?.message ?? err.message ?? 'Failed to fetch post');
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchPost();
        return () => mounted = false;
    }, [postId]);

    if (loading) return (
        <AuthenticatedLayout>
            <Head title="Loading..." />
            <div className="min-h-screen bg-gray-900 p-4">
                <div className="max-w-3xl mx-auto space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse bg-gray-800 rounded-xl p-4">
                            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
                            <div className="h-44 bg-gray-700 rounded mb-2" />
                            <div className="h-4 bg-gray-700 rounded w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );

    return (
        <AuthenticatedLayout>
            <Head title={post ? "Post" : "Error"} />
            <div className="min-h-screen bg-gray-900 text-gray-100 py-6">
                <div className="max-w-3xl mx-auto p-2 space-y-4">
                    {error && (
                        <div className="bg-red-900/50 border border-red-700 text-red-100 p-3 rounded-md">
                            Error: {error}
                        </div>
                    )}

                    {post && (
                        <>
                            {/* Put the comment input inside the post card */}
                            <PostLayout post={post} author={post.author}>
                                <CommentInputArea postId={post.id} />
                            </PostLayout>

                            <div className="space-y-3">
                                {post.all_comments?.length > 0 ? (
                                    post.all_comments.map(comment => (
                                        <CommentLayout
                                            key={comment.id}
                                            comment={comment}
                                            allComments={post.all_comments}
                                            replies={comment.all_replies}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center text-gray-400 py-6 rounded-md bg-gray-800/30">
                                        No comments yet. Be the first to comment!
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
