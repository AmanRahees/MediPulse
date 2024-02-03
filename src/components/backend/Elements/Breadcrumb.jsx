/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

function Breadcrumb({ pathToPage }) {
  return (
    <div className="block text-sm text-zinc-500">
      {pathToPage.map((item, index) => (
        <span key={index}>
          {index < pathToPage.length - 1 ? (
            <>
              <Link to={item.path} key={index} className="hover:text-main">
                {item.title}
              </Link>
              <span className="mx-1">
                <FontAwesomeIcon icon={faAngleRight} className="text-[10px]" />
              </span>
            </>
          ) : (
            <span className="text-black">{item.title}</span>
          )}
        </span>
      ))}
    </div>
  );
}

export default Breadcrumb;
