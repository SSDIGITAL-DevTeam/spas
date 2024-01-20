import { useEffect, useState } from 'react'
import { DataWithPagination, Post } from '@/@types'
import ApiError from '@/errors/ApiError'
import PostModule from '@/modules/PostModule'

export function usePosts() {
    // states
    const [posts, setPosts] = useState<DataWithPagination<Post>>()
    const [isPostsLoading, setIsPostsLoading] = useState<boolean>(false)
    const [postsErrors, setPostsErrors] = useState<ApiError>({} as ApiError)

    useEffect(() => {
        const fetchPosts = async (): Promise<void> => {
            setIsPostsLoading(true)

            try {
                const res = await new PostModule().all()
                setPosts(res)
            } catch (error) {
                setPostsErrors(error as ApiError)
            } finally {
                setIsPostsLoading(false)
            }
        }

        fetchPosts()
    }, [])

    return { posts, isPostsLoading, postsErrors }
}
