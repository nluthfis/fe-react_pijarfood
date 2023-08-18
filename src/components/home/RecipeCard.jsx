import React from "react";
import { Link } from "react-router-dom";

function RecipeCard(props) {
  const { item } = props;
  return (
    <>
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
            to={`/details/${item.tittle?.toLowerCase()?.split(" ")?.join("-")}`}
            state={{ data: item }}
            className="btn btn-warning shadow"
          >
            Go to Details
          </Link>
        </div>
      </div>
    </>
  );
}

export default RecipeCard;
