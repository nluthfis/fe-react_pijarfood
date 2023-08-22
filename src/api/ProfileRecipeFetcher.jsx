import { useEffect } from "react";
import axios from "axios";

function ProfileRecipeFetcher({ setRecipeList, setLikedRecipes }) {
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("auth");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const recipeListResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/recipes/profile/me`,
          { headers }
        );
        setRecipeList(recipeListResponse?.data?.data);

        const likedRecipesResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/liked/recipes`,
          { headers }
        );
        setLikedRecipes(likedRecipesResponse?.data?.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [setRecipeList, setLikedRecipes]);

  return null;
}

export default ProfileRecipeFetcher;
