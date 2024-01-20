import { Category, DataWithPagination, Post } from '@/@types'
import { useCategory } from '@/hooks/useCategory'

export enum CategoryActionEnum {
    GET = 'GET',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

type CategoryAction = {
    type: CategoryActionEnum
    payload: any
}

export function categoryReducer(
    state: DataWithPagination<Category>,
    action: CategoryAction,
): any {
    switch (action.type) {
        case CategoryActionEnum.GET:
            return useCategory
        case CategoryActionEnum.CREATE:
            return

        default:
            throw new Error('Unknown Action')
    }
}
