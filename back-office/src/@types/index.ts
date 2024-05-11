export type Login = {
    status: boolean
    data: {
        id: number
        name: string
        email: string
    }
    email: string
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

export type Operator = {
    id: number
    company_name: string
    uen_no: string
    brand_name: string
    address: string
    contact_no: string
    contact_person: string
    contact_person_no: string
    payment_slip: string
    email: string
    cover: Cover
    status: string
    user: Login
}

export type Therapist = {
    id: number
    name: string
    passport_finno: string
    date_of_birth: string
    sex: string
    contact_no: string
    nationality: string
    address: string
    professional_certs: string
    email: string
    name_cert: string
    issuing_organization: string
    date_of_issue: string
    expired_date: string
    credential_id: string
    employHistorys: Employment[]
    cover: Cover
    status: string
    user: Login
}

export type Employment = {
    id: number
    job_title: string
    company_name: string
    start_date: string
    end_date: string
    location: string
    descripstion: string
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
    end_date: string    
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

export type Pagination = {
    url?: string | null
    active: boolean
    label: string
}
