import axios from "axios";

export const addRecipe = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/recipes`,
      formData,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
