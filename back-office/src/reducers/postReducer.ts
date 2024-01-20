import { DataWithPagination, Post } from '@/@types'
import { usePosts } from '@/hooks/usePosts'

export enum PostActionEnum {
    GET = 'GET',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

type PostAction = {
    type: PostActionEnum
    payload: any
}

export function postReducer(
    state: DataWithPagination<Post>,
    action: PostAction,
): any {
    switch (action.type) {
        case PostActionEnum.GET:
            return usePosts
        case PostActionEnum.CREATE:
            return

        default:
            throw new Error('Unknown Action')
    }
}
