import { apiModule } from "./apiModule"

export const eventModule = {
    findAll: () => {
        return apiModule(`/end-user/events`)
    },

    findOne: (id: number) => {
        return apiModule(`/end-user/events/${id}`)
    },
}
