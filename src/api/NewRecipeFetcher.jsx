import { useEffect } from "react";
import axios from "axios";

function RecipeFetcher({ setNewRecipeList }) {
  useEffect(() => {
    const fetchNewRecipes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/recipes?sortType=desc`
        );
        setNewRecipeList(response?.data?.data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };
    fetchNewRecipes();
  }, [setNewRecipeList]);

  return null;
}

export default RecipeFetcher;
