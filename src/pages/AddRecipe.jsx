import React, { useEffect, useRef, useState } from "react";
import "../styles/AddRecipe.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { addRecipe } from "../api/AddRecipe";

function AddRecipe() {
  const navigate = useNavigate();
  const bgUploadPhoto = "/images/add-photo-form.png";
  const [recipePhoto, setRecipePhoto] = useState("");
  const tittle = useRef("");
  const ingredients = useRef("");
  const videoLink = useRef("");
  const category = useRef("");
  const description = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const categoryList = [
    {
      key: "Soup",
      value: "Soup",
    },
    {
      key: "Rice",
      value: "Rice",
    },
    {
      key: "Salad",
      value: "Salad",
    },
    {
      key: "Noodle",
      value: "Noodle",
    },
    {
      key: "Drink",
      value: "Drink",
    },
    {
      key: "Pizza",
      value: "Pizza",
    },
    {
      key: "Burger",
      value: "Burger",
    },
    {
      key: "CupCake",
      value: "CupCake",
    },
    {
      key: "Sandwich",
      value: "Sandwich",
    },
    {
      key: "Taco",
      value: "Taco",
    },
    {
      key: "Dumpling",
      value: "Dumpling",
    },
    {
      key: "Nugget",
      value: "Nugget",
    },
    {
      key: "Porridge",
      value: "Porridge",
    },
    {
      key: "Seafood",
      value: "Seafood",
    },
    {
      key: "Sushi",
      value: "Sushi",
    },
  ];

  const handleSubmit = async (e) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("tittle", tittle.current.value);
      formData.append("ingredients", ingredients.current.value);
      formData.append("videoLink", videoLink.current.value);
      formData.append("category", category.current.value);
      formData.append("photo", recipePhoto);
      formData.append("description", description.current.value);
      await addRecipe(formData);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [image, setImage] = useState(null);
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));
      setRecipePhoto(img);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/login");
    }
  }, []);
  return (
    <div style={{ overflowX: "none" }}>
      <Navbar />
      <div className="col d-flex flex-column">
        <div className="row py-5 justify-content-center">
          <div className="col-8">
            <form onSubmit={handleSubmit}>
              <div className="upload d-flex justify-content-center">
                <label>
                  <input
                    className="form-control mb-3"
                    type="file"
                    name="photo"
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{
                      display: "none",
                      backgroundImage: `url(${bgUploadPhoto})`,
                    }}
                  />
                  {!image && (
                    <img
                      src="/img/add.png"
                      alt="img-logo"
                      style={{ width: "50px" }}
                    />
                  )}
                </label>
                {image && (
                  <div>
                    <img
                      src={image}
                      alt="Preview"
                      className="img-fluid rounded"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "50vh",
                      }}
                    />
                  </div>
                )}
              </div>

              <input
                type="text"
                className="form-control mb-3"
                name="tittle"
                ref={tittle}
                id="tittle"
                placeholder="Tittle"
              />
              <p>
                Please include a comma followed by a space for each ingredient.
              </p>
              <textarea
                className="form-control mb-3"
                name="ingredients"
                ref={ingredients}
                id="ingredients"
                cols="35"
                rows="5"
                placeholder="Ingredients"
              ></textarea>
              <input
                type="text"
                className="form-control mb-3"
                name="videoLink"
                ref={videoLink}
                id="videoLink"
                placeholder="Videos"
              />
              <select
                className="form-control mb-3"
                name="category"
                ref={category}
                id="Category"
                placeholder="Category"
              >
                <option value="">Select a category</option>
                {categoryList.map((category) => (
                  <option key={category.key} value={category.value}>
                    {category.value}
                  </option>
                ))}
              </select>
              <textarea
                type="text"
                className="form-control mb-3"
                name="description"
                ref={description}
                id="Description"
                cols="35"
                rows="5"
                placeholder="Description"
              />
              <button type="submit" className="btn btn-warning mx-auto d-block">
                {isLoading ? "Loading..." : "Add Recipe"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddRecipe;
