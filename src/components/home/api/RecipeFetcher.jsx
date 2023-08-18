import React, { useEffect } from "react";
import axios from "axios";

function RecipeFetcher({ setRecipeList }) {
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/recipes?popular=popular`
        );
        setRecipeList(response?.data?.data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };

    fetchRecipes();
  }, [setRecipeList]);

  return null;
}

export default RecipeFetcher;
