import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "../styles/Details.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";
import { useSelector } from "react-redux";
import Comment from "../components/Comment";

function Details() {
  const [currentList, setCurrentList] = useState(null);
  const location = useLocation();
  const [liked, setLiked] = useState(false);
  const [liked_by, setLiked_by] = useState([]);
  const auth = useSelector((state) => state?.auth);
  const recipesData = location.state;
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const like = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/getlikes?recipe_id=${recipesData.data.id}`
        );
        if (!response.data.data || response.data.data.length === 0) {
          setLiked(false);
        } else {
          setLiked_by(response.data.data);
          const userId = auth.auth.data[0].id;
          const isUserIdIncluded = response.data.data.some(
            (user_id) => user_id.user_id === userId
          );
          setLiked(isUserIdIncluded !== undefined ? isUserIdIncluded : false);
        }
      } catch (error) {
        console.log(error);
        setLiked(false);
      }
    };
    like();
  }, []);

  const handleLikeButtonPress = async () => {
    try {
      if (!auth || !localStorage.getItem("token")) {
        setLiked(false);
        setLoginMessage("Please login first");
        return;
      }
      if (liked === true) {
        const token = auth.token;
        await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/unlikes?recipe_id=${recipesData.data.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLiked(false);
      } else {
        const token = auth.token;
        await axios.post(
          `${process.env.REACT_APP_BASE_URL}/likes?recipe_id=${recipesData.data.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLiked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <section id="content">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-5 col-xs-10">
              <div className="d-md-none">
                {/* Image for mobile view */}
                <img
                  src={recipesData.data.photo}
                  className="img-fluid rounded"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "50vh",
                  }}
                  alt="food-img"
                />
              </div>
              <h1
                className="text-center text-primary"
                style={{ textTransform: "capitalize" }}
              >
                {recipesData.data.tittle}
              </h1>
              <h4 className="text-center text-primary">
                {recipesData.data.category}
              </h4>
              <p className="text-center text-primary">
                {recipesData.data.description}
              </p>
              <div className="d-flex justify-content-center">
                <div className="d-flex flex-row align-items-center mb-3">
                  <button
                    type="button"
                    className={`btn ${
                      liked ? "btn-danger" : "btn btn-outline-danger"
                    } me-2`}
                    style={{ width: "15vh" }}
                    onClick={handleLikeButtonPress}
                  >
                    {liked ? "Liked" : "Like"}
                  </button>
                  <a
                    className="btn btn-warning"
                    style={{ width: "15vh" }}
                    href={recipesData?.data?.videoLink}
                  >
                    Video Link
                  </a>
                </div>
              </div>
              {!auth.auth && (
                <p className="text-danger text-center">{loginMessage}</p>
              )}
            </div>

            <div className="col-md-6 col-xs-10">
              <div className="col col-xs-10 d-none d-md-block">
                {/* Image for medium and larger screens */}
                <img
                  src={recipesData.data.photo}
                  className="img-fluid rounded"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "50vh",
                  }}
                  alt="food-img"
                />
              </div>
            </div>
          </div>

          <div className="row mt-5 text-primary d-flex justify-content-center">
            <div className="col-10">
              <h2>Ingredients</h2>
              <ul>
                {recipesData?.data?.ingredients
                  .split(",")
                  .map((ingredient, index) => (
                    <li key={index}>{ingredient.trim()}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section id="comment">
        <div className="container">
          <div className="row mt-5 text-primary d-flex justify-content-center">
            <div className="col-10">
              <h2>Comment</h2>
              <Comment recipeId={recipesData.data.id} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Details;
