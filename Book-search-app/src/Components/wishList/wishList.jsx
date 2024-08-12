import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../Slices/wishListSlice";

export default function Wishlist() {

  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Wishlist</h2>
      <ul>
        {wishlist.map((book) => (
          <div key={book.id}>
            <span>{book.volumeInfo.title}</span>
            <button onClick={() => dispatch(removeFromWishlist(book.id))}>delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
}