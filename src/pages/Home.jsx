import React, { useState } from "react";

import "../styles/Home.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SearchBar from "../components/home/SearchBar";
import RecipeFetcher from "../api/RecipeFetcher";
import RecipeCard from "../components/home/RecipeCard";
import NewRecipeFetcher from "../api/NewRecipeFetcher";
import PopularRecipeSection from "../components/home/PopularRecipeSection";
import Pagination from "../components/home/Pagination";

function App() {
  const [recipeList, setRecipeList] = useState([]);
  const [newRecipeList, setNewRecipeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(recipeList.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = recipeList.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
              <SearchBar setRecipeList={setRecipeList} />
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
          <RecipeFetcher setRecipeList={setRecipeList} />
          <div
            className="row flex-column flex-lg-row col-md-12 col-xs-10 align-items-center"
            style={{ marginTop: "100px" }}
          >
            {recipeList.slice(0, 1).map((item) => (
              <RecipeCard item={item} key={item.id} />
            ))}
          </div>
        </div>
      </section>

      <section id="new_recipe">
        <div className="container">
          <h2 className="mb-5 subtitle">New Recipe</h2>
          <NewRecipeFetcher setNewRecipeList={setNewRecipeList} />
          <div
            className="row flex-column flex-lg-row col-md-12 col-xs-10 align-items-center"
            style={{ marginTop: "100px" }}
          >
            {newRecipeList.slice(0, 1).map((item) => (
              <RecipeCard item={item} key={item.id} />
            ))}
          </div>
        </div>
        <div className="bg_yellow_2"></div>
      </section>
      <section id="popular-recipe">
        <div className="container mt-5 mb-5">
          <h2 className="mb-5 subtitle">Popular Recipe</h2>
          <div className="row text-decoration-none">
            <PopularRecipeSection currentItems={currentItems} />
          </div>
        </div>

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </section>

      <Footer className="mt-0" />
    </div>
  );
}

export default App;
