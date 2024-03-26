import React, { useContext } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { LogContext } from "./logcontext";

const Fab = () => {
  const navigate = useNavigate();
  const { logged } = useContext(LogContext);

  const handleClick = (event) => {
    event.preventDefault();
    navigate("/singlepost");
  };

  return (
    <div>
      {logged ? (
        <div className="d-flex justify-content-end fixed-bottom m-4">
          <button
            className="btn btn-lg rounded-circle"
            onClick={handleClick}
            type="button"
            style={{ backgroundColor: "black", color: "white" }}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Fab;
