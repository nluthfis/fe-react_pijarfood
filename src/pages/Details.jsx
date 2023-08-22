import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "../styles/Details.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useSelector } from "react-redux";
import Comment from "../components/Comment";
import { getLikes, likeRecipe, unlikeRecipe } from "../api/Likes";

function Details() {
  const location = useLocation();
  const [liked, setLiked] = useState(false);
  const [liked_by, setLiked_by] = useState([]);
  const auth = useSelector((state) => state?.auth);
  const recipesData = location.state;
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchLikes = async () => {
      try {
        const likes = await getLikes(recipesData.data.id);
        setLiked_by(likes);
        const userId = auth.auth.data[0].id;
        const isUserIdIncluded = likes.some(
          (user_id) => user_id.user_id === userId
        );
        setLiked(isUserIdIncluded);
      } catch (error) {
        setLiked(false);
      }
    };
    fetchLikes();
  }, [auth, recipesData]);

  const handleLikeButtonPress = async () => {
    try {
      if (!auth || !localStorage.getItem("token")) {
        setLiked(false);
        setLoginMessage("Please login first");
        return;
      }
      const token = auth.token;
      if (liked) {
        await unlikeRecipe(recipesData.data.id, token);
        setLiked(false);
      } else {
        await likeRecipe(recipesData.data.id, token);
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
          <div className="row d-flex justify-content-center">
            <div className="col-md-5 col-xs-12">
              <img
                src={recipesData.data.photo}
                className="img-fluid rounded mb-3"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "50vh",
                }}
                alt="food-img"
              />
            </div>
            <div className="col-md-5 col-xs-12">
              <h1
                className="text-primary"
                style={{ textTransform: "capitalize" }}
              >
                {recipesData.data.tittle}
              </h1>
              <h4
                className="text-primary"
                style={{ textTransform: "capitalize" }}
              >
                {recipesData.data.category}
              </h4>
              <p className="text-primary">{recipesData.data.description}</p>
              <div className="d-flex justify-content-center">
                <div className="d-flex flex-row mb-3">
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
                    Video
                  </a>
                </div>
              </div>
              {!auth.auth && <p className="text-center">{loginMessage}</p>}
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
