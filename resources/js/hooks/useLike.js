import { useState } from 'react';
import axios from 'axios';
import useAuthHeaders from './useAuthHeaders';

export default function useLike(initialLiked, initialCount, endpoint) {
    const [isLiked, setIsLiked] = useState(Boolean(initialLiked));
    const [count, setCount] = useState(Number(initialCount || 0));
    const [loading, setLoading] = useState(false);
    const headers = useAuthHeaders();

    const handleLike = async (id) => {
        if (loading) return;
        
        setLoading(true);
        const prevState = { isLiked, count };
        
        // Optimistic update
        setIsLiked(!isLiked);
        setCount(prev => isLiked ? Math.max(0, prev - 1) : prev + 1);

        try {
            const { data } = await axios.post(endpoint, { 
                [endpoint.includes('post') ? 'post_id' : 
                 endpoint.includes('comment') ? 'comment_id' : 'reply_id']: id 
            }, { headers });
            
            if (data) {
                if (data.likes_count !== undefined) setCount(Number(data.likes_count));
                if (data.auth_like_exists !== undefined) setIsLiked(Boolean(data.auth_like_exists));
            }
        } catch (err) {
            console.error('Like failed:', err);
            setIsLiked(prevState.isLiked);
            setCount(prevState.count);
        } finally {
            setLoading(false);
        }
    };

    return { isLiked, count, loading, handleLike };
}
