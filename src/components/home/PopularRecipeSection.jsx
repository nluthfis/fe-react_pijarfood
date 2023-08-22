import React from "react";
import { Link } from "react-router-dom";

const PopularRecipeSection = ({ currentItems }) => {
  return (
    <>
      {currentItems.map((item) => (
        <div className="col-md-3 col-xs-12 col-sm-12 mb-4" key={item.id}>
          <Link
            className="text-decoration-none"
            to={`/details/${item.tittle?.toLowerCase()?.split(" ")?.join("-")}`}
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
    </>
  );
};

export default PopularRecipeSection;
