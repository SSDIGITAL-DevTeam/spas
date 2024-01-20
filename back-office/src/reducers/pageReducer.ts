import { Page, DataWithPagination } from '@/@types'
import { usePage } from '@/hooks/usePage'

export enum PageActionEnum {
    GET = 'GET',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

type PageAction = {
    type: PageActionEnum
    payload: any
}

export function pageReducer(
    state: DataWithPagination<Page>,
    action: PageAction,
): any {
    switch (action.type) {
        case PageActionEnum.GET:
            return usePage
        case PageActionEnum.CREATE:
            return

        default:
            throw new Error('Unknown Action')
    }
}
