import React, { useState, useRef } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useSelector } from "react-redux";
import axios from "axios";
import "../styles/EditProfile.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserPhoto, addAuth } from "../reducers/auth";

function EditProfile() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth);
  const [photo, setPhoto] = useState(auth.auth.data[0].photo);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  // const photoNow = useSelector((state) => state.auth.auth?.data[0].photo);
  // console.log(photoNow);
  const handlePhotoChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };
  const handleSubmitPhoto = async (e) => {
    try {
      const formData = new FormData();
      formData.append("photo", file);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/profile/photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPhoto(response?.data?.data?.photo);
      dispatch(updateUserPhoto(response?.data?.data?.photo));
      setFile(null);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmitProfile = async (e) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/profile`,
        {
          fullName: nameRef.current,
          email: emailRef.current,
          phoneNumber: phoneRef.current,
          password: passwordRef.current,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(addAuth(response?.data));
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditAll = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const submitPhoto = async () => {
      if (file) {
        return await handleSubmitPhoto();
      }
    };
    const submitProfile = async () => {
      if (
        !(
          nameRef.current === "" ||
          emailRef.current === "" ||
          phoneRef.current === "" ||
          passwordRef.current === ""
        )
      )
        return await handleSubmitProfile();
    };
    try {
      await Promise.all([submitPhoto(), submitProfile()]).then((res) => {
        navigate("/profile");
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <h1 className="text-center">Edit Profile</h1>
          <div className="col col-7">
            <form onSubmit={handleEditAll}>
              <img
                src={photo}
                alt="avatar"
                className="rounded-circle mx-auto d-block"
                style={{
                  width: "20vh",
                  height: "20vh",
                  objectFit: "cover",
                }}
              />
              <div className="d-flex justify-content-center m-3">
                <input
                  className="text-center "
                  type="file"
                  id="file-input"
                  name="file-input"
                  onChange={handlePhotoChange}
                />
                <label
                  id="file-input-label "
                  htmlFor="file-input"
                  className=" btn btn-warning"
                >
                  Select a File
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="fullName"
                  name="fullName"
                  onChange={(e) => (nameRef.current = e.target.value)}
                  placeholder={auth.auth.data[0].fullName}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address*
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="email"
                  name="email"
                  onChange={(e) => (emailRef.current = e.target.value)}
                  placeholder={auth.auth.data[0].email}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={(e) => (phoneRef.current = e.target.value)}
                  placeholder={auth.auth.data[0].phoneNumber}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Create New Password
                </label>
                <input
                  type="password"
                  className="form-control form-control-sm"
                  id="password"
                  name="password"
                  onChange={(e) => (passwordRef.current = e.target.value)}
                  placeholder="Create new password"
                  autoComplete="off"
                />
              </div>

              {/* <button
                type="submit"
                className="btn btn-warning d-block mx-auto"
                onSubmit={handleSubmitProfile}
              >
                Change Profile
              </button> */}
              <button type="submit" className="btn btn-warning d-block mx-auto">
                {isLoading ? "Loading..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EditProfile;
