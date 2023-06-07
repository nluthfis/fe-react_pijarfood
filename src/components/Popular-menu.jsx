import React from "react";
import { Link } from "react-router-dom";

function PopularMenu(props) {
  const { title, image, id } = props;
  return (
    <>
      <div className="col-md-4 col-xs-12 col-sm-12 mb-4">
        <Link
          to={`/details/${title
            ?.toLowerCase()
            ?.split(" ")
            ?.join("-")}?id=${id}`}
          style={{ textDecoration: "none" }}
        >
          <div
            className="menu-background text-decoration-none"
            img-
            style={{
              backgroundImage: `url(${image})`,
            }}
          >
            <h3 className="popular-menu-list ">{title}</h3>
          </div>
        </Link>
      </div>
    </>
  );
}

export default PopularMenu;
