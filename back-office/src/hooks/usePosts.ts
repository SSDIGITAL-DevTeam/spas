import { useEffect, useState } from 'react'
import { DataWithPagination, Post } from '@/@types'
import ApiError from '@/errors/ApiError'
import PostModule from '@/modules/PostModule'

export function usePosts() {
    // states
    const [posts, setPosts] = useState<DataWithPagination<Post>>()
    const [isPostsLoading, setIsPostsLoading] = useState<boolean>(false)
    const [postsErrors, setPostsErrors] = useState<ApiError>({} as ApiError)

    const fetchPosts = async (page?: string): Promise<void> => {
        setIsPostsLoading(true)

        try {
            const res = await new PostModule().all(page)
            setPosts(res)
        } catch (error) {
            setPostsErrors(error as ApiError)
        } finally {
            setIsPostsLoading(false)
        }
    }

    return { posts, isPostsLoading, postsErrors, fetchPosts }
}
