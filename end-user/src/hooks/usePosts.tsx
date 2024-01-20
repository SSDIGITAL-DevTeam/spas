import { ApiError, DataWithPagination, Post } from '@/@types'
import { postModule } from '@/modules/postModule'
import { useEffect, useState } from 'react'

export function usePosts() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [posts, setPosts] = useState<DataWithPagination<Post>>(
        {} as DataWithPagination<Post>,
    )
    const [errors, setErrors] = useState<ApiError>({} as ApiError)

    const fetchPosts = async () => {
        setIsLoading(true)

        try {
            const res = await postModule.findAll()
            if (res) setPosts(res)
        } catch (error) {
            setErrors(error as ApiError)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return { posts, isLoading, errors }
}
