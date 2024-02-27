import { ApiError, DataWithPagination, Event } from "@/@types";
import { categoryModule } from "@/modules/categoryModule";
import { useEffect, useState } from "react";

export function useCategory() {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [categories, setCategories] = useState<DataWithPagination<Event>>(
      {} as DataWithPagination<Event>
   );
   const [errors, setErrors] = useState<ApiError>({} as ApiError);

   const fetchCategories = async () => {
      setIsLoading(true);

      try {
         const res = await categoryModule.findAll();
         if (res) setCategories(res);
      } catch (error) {
         setErrors(error as ApiError);
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchCategories();
   }, []);

   return { categories, isLoading, errors };
}
