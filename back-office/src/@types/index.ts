export type Login = {
    status: boolean
    data: {
        id: number
        name: string
        email: string
    }
    token: string
}

export type Post = {
    id: number
    title: string
    slug: string
    content: string
    status: string
    published_at?: string | null
    cover: Cover
    model?: string
    categories?: Category[]
    tags?: Tag[]
    meta?: Meta[]
}

export type Category = {
    id: number
    name: string
}

export type Page = {
    id: number
    name: string
    slug: string
}

export type Meta = {
    id: number
    key: string
    value: string
    content: string
    metaableId: number
    metaableType: string
}

export type Event = {
    id: number
    name: string
    description: string
    start_date: string
    end_date: number
}

export type Tag = {
    id: number
    name: string
}

export type Cover = {
    id: number
    url: string
}

export type DataWithPagination<T> = {
    data: T[]
    links: {
        first: string
        last: string
        prev: string
        next: string
    }
    meta: {
        first_item: number
        current_page: number
        from: number
        last_page: number
        links: Link[]
        path: string
        per_page: number
        to: number
        total: number
    }
}

export type Link = {
    url: string | null
    label: string
    active: boolean
}

export type ValidationErrors = {
    message: string
    errors: {
        email: string[]
        password: string[]
    }
}

export type LoginError = {
    status: boolean
    message: string
}

export type Customer = {
    id: number
    email: string
    phone: string
    service: string
}

export type Pagination = {
    url?: string | null
    active: boolean
    label: string
}
