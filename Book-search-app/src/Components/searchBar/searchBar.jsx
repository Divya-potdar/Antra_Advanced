import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../../Slices/bookSlice";


export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  // debounce - delay the execution of a function
  // throttle - limit the frequency of a fucntion call
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const debouncedOnSubmit = useCallback(_.debounce((query) => {
    if (query.trim()) {
      dispatch(fetchBooks(query));
    }
  }, 1000), [dispatch]);
  
  useEffect(() => {
    debouncedOnSubmit(inputValue);
  }, [inputValue, debouncedOnSubmit]);

  return (
    <div>
      <input value={inputValue} onChange={handleChange} />
      <button
        onClick={() => {
          if (inputValue.trim()) {
            dispatch(fetchBooks(inputValue));
          }
        }}
      >
        Submit
      </button>
    </div>
  );
}