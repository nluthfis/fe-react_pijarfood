import React, { useState } from "react";
import axios from "axios";

function SearchBar({ setRecipeList }) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/recipes`, {
        params: {
          keyword,
          sortType: "asc",
        },
      })
      .then((response) => setRecipeList(response?.data?.data));
  };

  return (
    <div className="search-bar">
      <input
        className="search-box form-control form-control-lg mt-5"
        placeholder="search restaurant, food"
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            window.location.href = "#popular-recipe";
            handleSearch();
          }
        }}
      />
    </div>
  );
}

export default SearchBar;
