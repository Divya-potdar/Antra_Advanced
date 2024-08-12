import React from "react";
import "./App.css";
import SearchBar from "./Components/searchBar/searchBar";
import SearchResults from "./Components/searchResult/searchResult";
import Wishlist from "./Components/whishList/wishList";

function App() {
  return (
    <div className="App">
      <div>
        <SearchBar />
        <SearchResults />
      </div>
      <div>
        <Wishlist />
      </div>
    </div>
  );
}

export default App;
