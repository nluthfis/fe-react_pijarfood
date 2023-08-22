/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useSelector } from "react-redux";
import axios from "axios";
import ProfileRecipeFetcher from "../api/ProfileRecipeFetcher";
import Pagination from "../components/home/Pagination";
import PopularRecipeSection from "../components/home/PopularRecipeSection";

function Profile() {
  const [recipeList, setRecipeList] = useState([]);
  const auth = useSelector((state) => state?.auth);
  const [likedRecipes, setLikedRecipes] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentLikedPage, setCurrentLikedPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(recipeList.length / itemsPerPage);
  const likedRecipesTotalPages = Math.ceil(likedRecipes.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = recipeList.slice(startIndex, endIndex);

  const likedRecipesStartIndex = (currentLikedPage - 1) * itemsPerPage;
  const likedRecipesEndIndex = likedRecipesStartIndex + itemsPerPage;
  const currentLikedItems = likedRecipes.slice(
    likedRecipesStartIndex,
    likedRecipesEndIndex
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLikedPageChange = (pageNumber) => {
    setCurrentLikedPage(pageNumber);
  };

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
                  <ProfileRecipeFetcher
                    setRecipeList={setRecipeList}
                    setLikedRecipes={setLikedRecipes}
                  />
                  <div className="container mt-5 mb-5">
                    <div className="row text-decoration-none">
                      <PopularRecipeSection currentItems={currentItems} />
                    </div>
                    <Pagination
                      totalPages={totalPages}
                      currentPage={currentPage}
                      handlePageChange={handlePageChange}
                    />
                  </div>
                </div>

                <div className="tab-pane container fade" id="set">
                  <div className="tab-pane container active" id="msg">
                    <div className="container mt-5 mb-5">
                      <div className="row text-decoration-none">
                        <PopularRecipeSection
                          currentItems={currentLikedItems}
                        />
                      </div>
                      <Pagination
                        totalPages={likedRecipesTotalPages}
                        currentPage={currentLikedPage}
                        handlePageChange={handleLikedPageChange}
                      />
                    </div>
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
