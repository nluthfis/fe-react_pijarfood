import axios from "axios";

export const getProfileData = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/recipes/profile/me`,
      { headers }
    );
    return result.data.data;
  } catch (error) {
    throw new Error("Error fetching profile data: " + error.message);
  }
};

export const getLikedRecipes = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/liked/recipes`,
      { headers }
    );
    return result.data.data;
  } catch (error) {
    throw new Error("Error fetching liked recipes: " + error.message);
  }
};

export const deleteRecipe = async (recipeId, token) => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/recipes/${recipeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw new Error("Error deleting recipe: " + error.message);
  }
};
