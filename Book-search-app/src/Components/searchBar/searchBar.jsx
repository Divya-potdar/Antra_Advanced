import React, { useCallback, useEffect, useState, useRef } from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../../Slices/bookSlice";
import './searchBar.css'; // Import the external CSS file

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const suggestionsRef = useRef(null);

  const debouncedOnSubmit = useCallback(
    _.debounce((query) => {
      if (query.trim()) {
        dispatch(fetchBooks(query));
      }
    }, 1000),
    [dispatch]
  );

  useEffect(() => {
    if (inputValue) {
      fetchSuggestions(inputValue);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue]);

  useEffect(() => {
    if (showSuggestions && suggestionsRef.current) {
      const activeElement = suggestionsRef.current.querySelector(".active");
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [activeSuggestion, showSuggestions]);

  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=10`
    );
    const data = await response.json();
    setSuggestions(data.items || []);
    setShowSuggestions(true);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevent default scrolling action
      if (activeSuggestion < suggestions.length - 1) {
        setActiveSuggestion(activeSuggestion + 1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevent default scrolling action
      if (activeSuggestion > 0) {
        setActiveSuggestion(activeSuggestion - 1);
      }
    } else if (e.key === "Enter") {
      e.preventDefault(); // Prevent default action
      if (activeSuggestion >= 0) {
        const selectedSuggestion = suggestions[activeSuggestion];
        setInputValue(selectedSuggestion.volumeInfo.title);
        setSuggestions([]);
        setShowSuggestions(false);
        debouncedOnSubmit(selectedSuggestion.volumeInfo.title);
      } else {
        debouncedOnSubmit(inputValue);
      }
      setActiveSuggestion(-1);
    } else if (e.key === "Escape") {
      e.preventDefault(); // Prevent default action
      setShowSuggestions(false);
      setActiveSuggestion(-1);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.volumeInfo.title);
    setSuggestions([]);
    setShowSuggestions(false);
    debouncedOnSubmit(suggestion.volumeInfo.title);
  };

  return (
    <div className="search-bar-container">
      <input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for books"
        className="search-bar-input"
      />
      <button
        onClick={() => {
          if (inputValue.trim()) {
            debouncedOnSubmit(inputValue);
            setShowSuggestions(false);
            setSuggestions([]);
          }
        }}
        className="search-bar-button"
      >
        Submit
      </button>
      {showSuggestions && (
        <ul
          className="suggestions-list"
          ref={suggestionsRef}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`suggestion-item ${index === activeSuggestion ? "active" : ""}`}
            >
              {suggestion.volumeInfo.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
