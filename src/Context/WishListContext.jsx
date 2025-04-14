
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import toast from "react-hot-toast";

export let WishListContext = createContext();

export default function WishListProvider(props) {
  const [wishListItemsIDs, setwishListItemsIDs] = useState([]);
  const [wishListItems, setwishListItems] = useState([]);
  const [noOfWishList, setNoOfWishList] = useState(0);

  let headers = {
    token: localStorage.getItem("userToken")
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getAllProductFromWishlist();
    }
  }, []);

  async function addProductToWishlist(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, { headers })
      .then((response) => {
        toast.success(response.data.message);
        setwishListItemsIDs(response.data.data || []);
        setNoOfWishList(response.data.data.length);
        return response;
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to add to wishlist");
        return error;
      });
  }

  async function removeProductFromWishlist(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
      .then((response) => {
        toast.success(response.data.message);
        setwishListItemsIDs(response.data.data);
        setNoOfWishList(response.data.data.length);
        return response;
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to remove from wishlist");
        return error;
      });
  }

  async function getAllProductFromWishlist() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers: { token: localStorage.getItem("userToken") } })
      .then((response) => {
        setwishListItemsIDs(response.data.data);
        setNoOfWishList(response.data.count);
        setwishListItems(response.data.data)
        const productIds = response.data.data.map(item => item.id);
        setwishListItemsIDs(productIds); 
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  return (
    <WishListContext.Provider value={{
      addProductToWishlist,
      wishListItemsIDs,
      removeProductFromWishlist,
      getAllProductFromWishlist,
      noOfWishList,
      setwishListItemsIDs,
      setNoOfWishList,
      setwishListItems,
      wishListItems

    }}>
      {props.children}
    </WishListContext.Provider>
  );
}