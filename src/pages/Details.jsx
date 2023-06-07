import React from "react";
import { useLocation } from "react-router";
import "../styles/Details.css";
import YouTube from "react-youtube";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

import axios from "axios";

function Details() {
  const location = useLocation();
  const [currentList, setCurrentList] = React.useState(null);
  const id = location?.search?.split("?id=")[1];

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/recipes/${id}`)
      .then((response) => setCurrentList(response?.data?.data[0]));
  }, [id]);

  return (
    <div>
      <Navbar />
      <section id="content">
        <div class="container py-5">
          <h1 class="text-center text-primary">{currentList?.tittle}</h1>
          <div className="d-flex justify-content-center ">
            <div class="col-md-6 col-xs-10 order-1 order-md-1 ">
              <img
                src={currentList?.photo}
                class="rounded img-fluid mx-auto d-block"
                alt="food-img"
              />
            </div>
          </div>

          <div class="row mt-5 text-primary d-flex justify-content-center">
            <div class="col-10 text-center">
              <h2>Ingredients</h2>
              <p>{currentList?.ingredients}</p>
            </div>
          </div>

          <div class="row mt-5 text-primary">
            <div class="col offset-md-2">
              <a class="btn btn-warning" href={currentList?.videoLink}>
                Video Link
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Details;
