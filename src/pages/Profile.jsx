import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import PopularMenu from "../components/Popular-menu";

import { useNavigate } from "react-router-dom";

import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = React.useState(null);
  const [recipeList, setRecipeList] = React.useState([]);

  React.useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/login");
    }
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("auth")) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/profile`)
        .then((result) => setProfile(result?.data?.data[0]));

      axios
        .get(`${process.env.REACT_APP_BASE_URL}/recipes/profile/me`)
        .then((result) => setRecipeList(result?.data?.data));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div class="container py-5">
        <div class="row py-5">
          <img
            class="rounded-circle mx-auto d-block py-3"
            style={{ width: "200px" }}
            src={profile?.photo}
            alt="avatar"
          />
          <p class="text-center fw-bold">{profile?.fullName}</p>
        </div>
        <div class="row">
          <div class="col">
            <div class="container" style={{ marginTop: "10px" }}>
              <ul class="nav nav-tabs">
                <li class="nav-item">
                  <a class="nav-link active" data-bs-toggle="tab" href="#msg">
                    My Recipe
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-bs-toggle="tab" href="#pro">
                    Saved Recipe
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-bs-toggle="tab" href="#set">
                    Liked Recipe
                  </a>
                </li>
              </ul>

              <div class="tab-content">
                <div class="tab-pane container active" id="msg">
                  <div className="row mt-3">
                    {recipeList.map((item) => (
                      <PopularMenu
                        title={item?.tittle}
                        image={item?.photo}
                        id={item?.id}
                      />
                    ))}
                  </div>
                </div>
                <div class="tab-pane container fade" id="pro">
                  This is a profile tab.
                </div>
                <div class="tab-pane container fade" id="set">
                  This is a setting tab.
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
