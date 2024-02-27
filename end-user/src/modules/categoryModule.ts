import { apiModule } from "./apiModule"

export const categoryModule = {
   findAll: () => {
      return apiModule(`/end-user/categories`)
   },

   findOne: (id: string) => {
      return apiModule(`/end-user/categories/${id}`)
   },
}
