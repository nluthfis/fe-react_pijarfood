import "../styles/Home.css";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import PopularMenu from "../components/Popular-menu";
import React from "react";

import { Link } from "react-router-dom";

import axios from "axios";

function App() {
  const [recipeList, setRecipeList] = React.useState([]);

  const [keyword, setKeyword] = React.useState("");

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/recipes?sortType=asc`)
      .then((response) => setRecipeList(response?.data?.data));
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
          <div
            className="row flex-column flex-lg-row mt-5"
            style={{ height: "90vh" }}
          >
            <div className="col-md-7 col-xs-10 align-self-center order-2 order-md-1 ">
              <h1 className="text-center text-lg-start text-primary mt-5">
                Discover Recipe & <br />
                Delicious Food
              </h1>
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
            <div className="col-md-5 col-xs-10 order-1 order-md-1">
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
            className="row flex-column flex-lg-row col-md-12 col-xs-10"
            style={{ marginTop: "100px" }}
          >
            <div className="col">
              <img
                className="rounded img-fluid mx-auto d-block"
                src="/img/osengterikentang.jpg"
                alt="img-menu"
              />
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-4 col-xs-10 d-flex flex-column d-lg-block justify-content-center align-self-center">
              <h3 className="text-center text-lg-start mt-5">
                Oseng Teri Kentang
              </h3>
              <hr style={{ marginLeft: "10%", width: "20%" }} />
              <p className="text-center text-lg-start ">
                Oseng Ikan Teri Dikombinasikan dengan kentang
              </p>
              <div className="text-center text-lg-start ">
                <Link
                  to="/details/oseng-teri-kentang"
                  className="btn btn-warning shadow"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="new_recipe">
        <div className="container">
          <h2 className="mb-5 subtitle">New Recipe</h2>
          <div
            className="row flex-column flex-lg-row col-md-12 col-xs-10"
            style={{ marginTop: "100px" }}
          >
            <div className="col">
              <img
                className="rounded img-fluid mx-auto d-block"
                src="/img/Gulainangkapadang.jpg"
                alt="img-menu1"
              />
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-4 col-xs-10 d-flex flex-column d-lg-block justify-content-center align-self-center">
              <h3 className="text-center text-lg-start mt-5">
                Gulai Nangka Padang
              </h3>
              <hr
                className="text-center text-lg-start"
                style={{ marginLeft: "10%", width: "20%" }}
              />
              <p className="text-center text-lg-start ">
                Paduan gulai daging sapi dengan campuran nangka padang dibasuh
                bumbu kuning
              </p>
              <div className="text-center text-lg-start ">
                <Link
                  to="/details/gulai-nangka-padang"
                  className="btn btn-warning shadow "
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="bg_yellow_2"></div>
      </section>

      <section id="popular-recipe">
        <div className="container">
          <h2 className="mb-5 subtitle">Popular Recipe</h2>

          <div className="row">
            {recipeList.map((item) => (
              <PopularMenu
                title={item?.tittle}
                image={item?.photo}
                id={item?.id}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;
