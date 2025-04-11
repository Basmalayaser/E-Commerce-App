import { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export let CategoryContext = createContext();

export default function CategoryContextProvider(props) {
  const [allCategories, setAllCategories] = useState([]);


  function getCategoryList() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['categoryList'],
    queryFn: getCategoryList,
  });


  useEffect(() => {
    if (data?.data?.data) {
      setAllCategories(data.data.data);
    }
  }, [data]);



  return (
    <CategoryContext.Provider value={{ allCategories, isLoading, error, isError }}>
      {props.children}
    </CategoryContext.Provider>
  );
}