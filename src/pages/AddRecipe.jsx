import React, { useState } from "react";
import "../styles/AddRecipe.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddRecipe() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tittle: "",
    ingredients: "",
    videoLink: "",
  });

  // const [formImage, setFormImage] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://clean-ruby-cuttlefish.cyclic.app/recipes",
        formData
      );
      // const result = await axios.post(
      //   "https://clean-ruby-cuttlefish.cyclic.app/recipes",
      //   formImage
      // );
      console.log(response.data);
      // console.log(result.data);
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleFileSelect = (e) => {
  //   setFormImage(e.target.files[0]);
  // };

  React.useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <Navbar />

      <div className="col d-flex flex-column">
        <div className="row py-5 justify-content-center">
          <div className="col-7">
            <form onSubmit={handleSubmit}>
              <div className="upload d-flex justify-content-center">
                <label>
                  <input
                    className="form-control mb-3"
                    type="file"
                    name="photo"
                    // value={formImage.File}
                    // onChange={handleFileSelect}
                    accept="image/*,.pdf"
                    style={{ display: "none" }}
                  />
                  <img
                    src="/img/add.png"
                    alt="img-logo"
                    style={{ width: "50px" }}
                  />
                </label>
              </div>
              <input
                type="text"
                className="form-control mb-3"
                name="tittle"
                value={formData.tittle}
                onChange={handleChange}
                id="tittle"
                placeholder="Tittle"
              />
              <textarea
                className="form-control mb-3"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                id="ingredients"
                cols="35"
                rows="5"
                placeholder="Ingredients"
              ></textarea>
              <input
                type="text"
                className="form-control mb-3"
                name="videoLink"
                value={formData.videoLink}
                onChange={handleChange}
                id="videoLink"
                placeholder="Videos"
              />
              <button type="submit" className="btn btn-warning mx-auto d-block">
                Post
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
