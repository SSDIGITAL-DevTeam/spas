import { useState } from 'react'
import { DataWithPagination, Post } from '@/@types'
import ApiError from '@/errors/ApiError'
import PostModule from '@/modules/PostModule'
import { PostStatusEnum } from '@/enums'

export function usePosts() {
    // states
    const [posts, setPosts] = useState<DataWithPagination<Post>>()
    const [isPostsLoading, setIsPostsLoading] = useState<boolean>(false)
    const [postsErrors, setPostsErrors] = useState<ApiError>({} as ApiError)

    const fetchPosts = async (
        page: string = '1', 
        status: PostStatusEnum = PostStatusEnum.PUBLISHED, 
        searchQuery: string = ''
    ): Promise<void> => {
        setIsPostsLoading(true);

        try {
            const postModule = new PostModule();
            const res = await postModule.all(page, status, searchQuery);
            setPosts(res);
        } catch (error) {
            setPostsErrors(error as ApiError);
        } finally {
            setIsPostsLoading(false);
        }
    };

    return { posts, isPostsLoading, postsErrors, fetchPosts }
}
