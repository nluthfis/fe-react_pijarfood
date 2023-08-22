import axios from "axios";

export const getLikes = async (recipeId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getlikes?recipe_id=${recipeId}`
    );
    return response.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const likeRecipe = async (recipeId, token) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_BASE_URL}/likes?recipe_id=${recipeId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const unlikeRecipe = async (recipeId, token) => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/unlikes?recipe_id=${recipeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
