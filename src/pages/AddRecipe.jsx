import React, { useRef, useState } from "react";
import "../styles/AddRecipe.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function AddRecipe() {
  const navigate = useNavigate();
  const [bgUploadPhoto, setBgPhoto] = React.useState(
    "/images/add-photo-form.png"
  );
  const [recipePhoto, setRecipePhoto] = React.useState("");
  const tittle = useRef("");
  const ingredients = useRef("");
  const videoLink = useRef("");
  const category = useRef("");
  const description = useRef("");
  const [isLoading, setIsLoading] = React.useState(false);
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
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/recipes`, formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          navigate("/");
        });
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

  React.useEffect(() => {
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
                    accept="image/*,.pdf"
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
              <input
                type="text"
                className="form-control mb-3"
                name="category"
                ref={category}
                id="Category"
                placeholder="Category"
              />
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
