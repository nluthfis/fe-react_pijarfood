/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [recipeList, setRecipeList] = useState([]);
  const [show, setShow] = useState(false);
  const auth = useSelector((state) => state?.auth);
  const [photo, setPhoto] = useState(profile?.photo);
  const [likedRecipes, setLikedRecipes] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/login");
    } else {
      const token = localStorage.getItem("auth");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/recipes/profile/me`, {
          headers,
        })
        .then((result) => {
          setRecipeList(result?.data?.data);
          axios
            .get(`${process.env.REACT_APP_BASE_URL}/liked/recipes`, { headers })
            .then((likedResult) => {
              setLikedRecipes(likedResult?.data?.data);
            })
            .catch((error) => {
              console.error("Error fetching liked recipes:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching recipe list:", error);
        });
    }
  }, []);

  if (!auth || !auth.auth || !auth.auth.data || auth.auth.data.length === 0) {
    return null;
  }

  const handleRemoveRecipe = async (event) => {
    event.preventDefault();
    const recipeId = Number(event.target.dataset.recipeId);
    const token = localStorage.getItem("auth");
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/recipes/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the recipeList state by removing the deleted item
      setRecipeList((prevList) =>
        prevList.filter((item) => item.id !== recipeId)
      );
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col col-7 py-5">
            <img
              className="rounded-circle img-fluid mx-auto d-block"
              style={{
                width: "20vh",
                height: "20vh",
                objectFit: "cover",
              }}
              src={auth.auth.data[0].photo}
              alt="avatar"
            />
            <p
              className="text-center fw-bold mt-3"
              style={{ fontSize: "20px" }}
            >
              {auth?.auth?.data[0]?.fullName}
            </p>
          </div>
        </div>

        <div></div>
        <div className="row">
          <div className="col">
            <div className="container" style={{ marginTop: "10px" }}>
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className="nav-link active text-dark"
                    data-bs-toggle="tab"
                    href="#msg"
                  >
                    My Recipe
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-dark"
                    data-bs-toggle="tab"
                    href="#set"
                  >
                    Liked Recipe
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div className="tab-pane container active" id="msg">
                  {recipeList.length === 0 ? (
                    <p>You haven't added any recipes yet!</p>
                  ) : (
                    <div className="row mt-3">
                      {recipeList.map((item) => (
                        <div
                          className="col-md-3 col-xs-12 col-sm-12 mb-4"
                          key={item.id}
                        >
                          <Link
                            className="text-decoration-none"
                            to={`/details/${item.tittle
                              ?.toLowerCase()
                              ?.split(" ")
                              ?.join("-")}`}
                            state={{ data: item }}
                          >
                            <div
                              className="menu-background text-decoration-none"
                              style={{
                                backgroundImage: `url(${item.photo})`,
                              }}
                            >
                              <div>
                                <h3
                                  className="popular-menu-list"
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {item.tittle}
                                </h3>
                                <button
                                  type="button"
                                  className="btn btn-outline-danger"
                                  data-recipe-id={item.id}
                                  onClick={handleRemoveRecipe}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="tab-pane container fade" id="set">
                  <div className="tab-pane container active" id="msg">
                    {likedRecipes.length === 0 ? (
                      <p>No liked recipes</p>
                    ) : (
                      <div className="row mt-3">
                        {likedRecipes.map((item) => (
                          <div
                            className="col-md-3 col-xs-12 col-sm-12 mb-4"
                            key={item.id}
                          >
                            <Link
                              className="text-decoration-none"
                              to={`/details/${item.tittle
                                ?.toLowerCase()
                                ?.split(" ")
                                ?.join("-")}`}
                              state={{ data: item }}
                            >
                              <div
                                className="menu-background text-decoration-none"
                                style={{
                                  backgroundImage: `url(${item.photo})`,
                                }}
                              >
                                <h3
                                  className="popular-menu-list"
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {item.tittle}
                                </h3>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr style={{ width: "100%" }} />
        </div>
      </div>
      <section></section>
      <Footer />
    </div>
  );
}

export default Profile;
