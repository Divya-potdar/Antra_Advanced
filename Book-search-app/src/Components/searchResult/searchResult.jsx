import React from "react";
import BookCard from "./bookCards";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../../Slices/wishListSlice";

import Loader from "../Loader/loader";

export default function SearchResults(){ 
  const { items: books, status, error } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  
  const handleAddToWishlist = (book) => {
  dispatch(addToWishlist(book));


 };
 if (status === 'loading') {
  return <Loader />;
}

if (status === 'failed') {
  return <div>Error: {error}</div>;
}


  return (
    <ul>
      {books?.map((book) => (
      <BookCard book={book} onAdd={handleAddToWishlist} key={book.id} />

      ))}
    </ul>
  );
}