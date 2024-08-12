import React from "react";

export default function BookCard({ book, onAdd }) {
  const { imageLinks, title, authors, publisher,publishedDate, description } = book.volumeInfo;
  return (
    <div onClick={() => onAdd(book)}>
      <img src={imageLinks?.thumbnail} />
      <h3>{title}</h3>
      <p>Author: {authors}</p>
      <p>Publisher : {publisher}</p>
      <p>Published Date: {publishedDate}</p>
      <p>Description: {description}</p>
    </div>
  );
}