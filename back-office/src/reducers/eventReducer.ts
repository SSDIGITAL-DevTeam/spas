import { Event, DataWithPagination, Post } from '@/@types'
import { useEvent } from '@/hooks/useEvent'

export enum EventActionEnum {
    GET = 'GET',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

type EventAction = {
    type: EventActionEnum
    payload: any
}

export function eventReducer(
    state: DataWithPagination<Event>,
    action: EventAction,
): any {
    switch (action.type) {
        case EventActionEnum.GET:
            return useEvent
        case EventActionEnum.CREATE:
            return

        default:
            throw new Error('Unknown Action')
    }
}
