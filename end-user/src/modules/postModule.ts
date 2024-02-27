import { apiModule } from "./apiModule"

export const postModule = {
    findAll: () => {
        return apiModule(`/end-user/posts`)
    },

    findOne: (slug: string) => {
        return apiModule(`/end-user/posts/${slug}`)
    },

    findCategoryPost: (search: string) => {
        return apiModule(`/end-user/posts?search=${search}`)
    },
}
