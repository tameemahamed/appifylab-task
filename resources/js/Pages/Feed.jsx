import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CreatePostLayout from "@/Layouts/CreatePostLayout";
import PostLayout from "@/Layouts/PostLayout";
import CommentInputArea from "@/Components/CommentInputArea";
import RecentComment from "@/Components/RecentComment";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ReplyInputArea } from "@/Components/ReplyInputArea";
import useAuthHeaders from "@/hooks/useAuthHeaders";

export default function Feed() {
    const headers = useAuthHeaders();
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        next_page_url: null,
        prev_page_url: null,
    });

    useEffect(() => {
        axios.get(`/api/posts?page=${currentPage}`, { headers })
            .then(({ data }) => {
                setPosts(data.data);
                setPagination({
                    current_page: data.current_page,
                    last_page: data.last_page,
                    next_page_url: data.next_page_url,
                    prev_page_url: data.prev_page_url,
                });
            })
            .catch(console.error);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (
            (newPage > currentPage && pagination.next_page_url) ||
            (newPage < currentPage && pagination.prev_page_url)
        ) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const PaginationButton = ({ direction, disabled, onClick }) => (
        <button
            onClick={onClick}
            disabled={disabled}
            className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
            {direction}
        </button>
    );

    return (
        <AuthenticatedLayout>
            <Head title="Feed" />

            <div className="py-6 max-w-3xl mx-auto px-4">
                <main className="w-full space-y-6">

                    {/* Create post */}
                    <CreatePostLayout />

                    {/* Posts */}
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <PostLayout key={post.id} post={post} author={post.author}>
                                <div className="mt-3">
                                    <CommentInputArea postId={post.id} />

                                    {post.last_comment && (
                                        <div className="mt-3">
                                            {post.comments_count > 1 && (
                                                <div className="text-sm text-gray-400 mb-2">
                                                    <Link
                                                        href={`/post/${post.id}`}
                                                        className="hover:text-white transition-colors"
                                                    >
                                                        view previous comments
                                                    </Link>
                                                </div>
                                            )}

                                            <RecentComment comment={post.last_comment} />

                                            <div className="mt-2">
                                                <ReplyInputArea commentId={post.last_comment.id} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </PostLayout>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-6">
                        <PaginationButton
                            direction="Previous"
                            disabled={!pagination.prev_page_url}
                            onClick={() => handlePageChange(currentPage - 1)}
                        />
                        <span className="text-gray-300 text-sm">
                            Page {pagination.current_page} of {pagination.last_page}
                        </span>
                        <PaginationButton
                            direction="Next"
                            disabled={!pagination.next_page_url}
                            onClick={() => handlePageChange(currentPage + 1)}
                        />
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
