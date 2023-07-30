import "../styles/Home.css";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeRecipes } from "../reducers/recipesSlice";

import axios from "axios";

function App() {
  const [recipeList, setRecipeList] = useState([]);
  const [newRecipeList, setNewRecipeList] = useState([]);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(recipeList.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = recipeList.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/recipes?popular=popular`
        );
        setRecipeList(response?.data?.data);
        dispatch(storeRecipes(response?.data?.data));
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };
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
    fetchRecipes();
  }, []);

  const handleSearch = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/recipes`, {
        params: {
          keyword,
          sortType: "asc",
        },
      })
      .then((response) => setRecipeList(response?.data?.data));
  };

  return (
    <div className="App">
      <header>
        <Navbar />

        <div className="container">
          <div className="row flex-column flex-lg-row mt-5">
            <div className="col-md-6 col-xs-10 align-self-center order-2 order-md-1 ">
              <h2 className="text-center text-lg-start text-primary mt-5">
                Discover Recipe & <br />
                Delicious Food
              </h2>
              <div className="search-bar">
                <input
                  className="search-box form-control form-control-lg mt-5"
                  placeholder="search restaurant, food"
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      window.location.href = "#popular-recipe";
                      handleSearch();
                    }
                  }}
                />
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-md-4 col-lg-4 col-xs-8 col-sm-8 order-1 order-md-1">
              <img
                className="rounded img-fluid mx-auto d-block"
                src="/img/1.jpg"
                alt="img-header"
              />
            </div>
          </div>
        </div>

        <div className="bg_yellow"></div>
      </header>

      <section id="popular-for-you">
        <div className="container">
          <h2 className="mb-5 subtitle">Popular For You !</h2>
          <div
            className="row flex-column flex-lg-row col-md-12 col-xs-10 align-items-center"
            style={{ marginTop: "100px" }}
          >
            {recipeList.slice(0, 1).map((item) => (
              <div className="row align-items-center" key={item.id}>
                <div className="col">
                  <img
                    className="img-fluid rounded"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "50vh",
                    }}
                    src={item.photo}
                    alt="img-menu"
                  />
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-5 col-xs-10 d-flex flex-column d-lg-block justify-content-center align-self-center">
                  <h3
                    className="text-center text-lg-start mt-5"
                    style={{ textTransform: "capitalize" }}
                  >
                    {item.tittle}
                  </h3>
                  <h6 className="text-center text-lg-start">{item.category}</h6>
                  <p>{item.description}</p>
                  <hr className="d-lg-block mx-auto" style={{ width: "20%" }} />
                  <div className="text-center text-lg-start">
                    <Link
                      to={`/details/${item.tittle
                        ?.toLowerCase()
                        ?.split(" ")
                        ?.join("-")}`}
                      state={{ data: item }}
                      className="btn btn-warning shadow"
                    >
                      Go to Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="new_recipe">
        <div className="container">
          <h2 className="mb-5 subtitle">New Recipe</h2>
          <div
            className="row flex-column flex-lg-row col-md-12 col-xs-10 align-items-center" // Add align-items-center class here
            style={{ marginTop: "100px" }}
          >
            {newRecipeList.slice(0, 1).map((item) => (
              <div className="row align-items-center" key={item.id}>
                <div className="col">
                  <img
                    className="img-fluid rounded"
                    src={item.photo}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "50vh",
                    }}
                    alt="img-menu1"
                  />
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-5 col-xs-10 d-flex flex-column d-lg-block justify-content-center align-self-center">
                  <h3
                    className="text-center text-lg-start mt-5"
                    style={{ textTransform: "capitalize" }}
                  >
                    {item.tittle}
                  </h3>
                  <h6 className="text-center text-lg-start">{item.category}</h6>
                  <p>{item.description}</p>
                  <hr
                    className="d-lg-block mx-auto text-lg-start"
                    style={{ width: "20%" }}
                  />
                  <div className="text-center text-lg-start">
                    <Link
                      to={`/details/${item.tittle
                        ?.toLowerCase()
                        ?.split(" ")
                        ?.join("-")}`}
                      state={{ data: item }}
                      className="btn btn-warning shadow"
                    >
                      Go to Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg_yellow_2"></div>
      </section>

      <section id="popular-recipe">
        <div className="container mt-5 mb-5">
          <h2 className="mb-5 subtitle">Popular Recipe</h2>

          <div className="row text-decoration-none">
            {currentItems.map((item) => (
              <div className="col-md-3 col-xs-12 col-sm-12 mb-4" key={item.id}>
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
          {/* Pagination */}
          <ul className="pagination ">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <li
                  key={pageNumber}
                  className={`page-item ${
                    pageNumber === currentPage ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link me-2"
                    style={{
                      backgroundColor: "#ffc107",
                      borderColor: "#ffc107",
                      color: "#fff",
                    }}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </section>

      <Footer className="mt-0" />
    </div>
  );
}

export default App;
