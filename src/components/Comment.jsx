import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
const scores = [1, 2, 3, 4, 5];
function Comment(props) {
  const auth = useSelector((state) => state?.auth);
  const [comment, setComment] = useState("");
  const [selectedScore, setSelectedScore] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const commentRef = useRef(null);
  const recipe_id = props.recipeId;
  const handleScoreSelection = (score) => {
    setSelectedScore(score);
  };
  useEffect(() => {
    if (auth !== null) {
      setIsLoggedin(false);
    } else {
      const commentBy = comment.map((comment) => comment.comment_by);
      const isIdIncluded = commentBy.includes(auth.auth.data[0].id.toString());
      if (isIdIncluded !== isComment) {
        setIsComment(isIdIncluded);
      }
    }
  }, [auth, comment]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (!auth) {
        setErrorMessage("Please login first.");
      } else if (isComment) {
        setErrorMessage("You have already commented on this recipe.");
      } else {
        if (commentRef.current && commentRef.current.value && selectedScore) {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/post_comment`,
            {
              recipe_id: recipe_id,
              comment: commentRef.current.value,
              score: selectedScore,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          if (
            response.data.status === false &&
            response.data.message === "User already commented"
          ) {
            setErrorMessage("You have already commented on this recipe.");
          } else {
            const commentResponse = await axios.get(
              `${process.env.REACT_APP_BASE_URL}/comment?recipe_id=${props.recipeId}`
            );
            setComment(commentResponse.data.data);
          }
        } else {
          setErrorMessage("Comment field or score is not selected");
        }
        setFormSubmitted(true);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message === "invalid token"
      ) {
        setErrorMessage("Please login first.");
      } else if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "User already commented"
      ) {
        setErrorMessage("You have already commented on this recipe.");
      } else {
        console.log(error);
        setErrorMessage("An error occurred while submitting the comment.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/comment?recipe_id=${props.recipeId}`
        )
        .then((response) => {
          if (JSON.stringify(response.data.data) !== JSON.stringify(comment)) {
            setComment(response.data.data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container">
      <div className="commentForm">
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Form onSubmit={handleSubmit}>
          <div>
            {scores.map((score, index) => (
              <React.Fragment key={score}>
                <Form.Check
                  type="checkbox"
                  label={score.toString()}
                  checked={selectedScore === score}
                  onChange={() => handleScoreSelection(score)}
                  style={{ display: "inline-block", marginRight: "5px" }}
                />
                {index !== scores.length - 1 && " "}
              </React.Fragment>
            ))}
          </div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Add a Review:</Form.Label>
            <Form.Control as="textarea" rows={3} ref={commentRef} />
          </Form.Group>
          {formSubmitted &&
            (!commentRef.current ||
              !commentRef.current.value ||
              !selectedScore) && (
              <p style={{ color: "red" }}>
                Comment field or score is not selected
              </p>
            )}
          <Button
            type="submit"
            variant="warning mb-5"
            disabled={isLoading || isComment}
          >
            {isLoading ? "Loading..." : "Submit review"}
          </Button>
        </Form>
      </div>
      <div className="row">
        <div className="col">
          {comment.length === 0 ? (
            <p>No comments available</p>
          ) : (
            comment.map((comment, index) => (
              <div
                key={`${comment.id}-${index}`}
                className="commentContainer d-flex align-items-center"
              >
                {comment?.photo_user && (
                  <img
                    src={comment.photo_user}
                    alt="user-avatar"
                    className="avatar rounded-circle"
                    style={{ width: 60, height: 60 }}
                  />
                )}
                <div className="commentContent d-flex-column align-items-center ms-3 mb-3">
                  <h5 className="name m-0">{comment.name_user}</h5>
                  <p className="score m-0">
                    {Array.from({ length: comment.score }, (_, index) => (
                      <FaStar style={{ color: "#FFAE42" }} key={index} />
                    ))}
                  </p>
                  <p className="comment m-0 ">{comment.comment}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
