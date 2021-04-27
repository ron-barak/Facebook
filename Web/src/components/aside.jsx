import React from "react";
import { Link } from "react-router-dom";

const Aside = ({ userInfo }) => {
  return (
    <>
      {userInfo && (
        <div style={{ width: "320px" }}>
          <ul className="list-group list">
            <Link
              to="/profile"
              className="list-group-item border-bottom text-dark text-decoration-none"
            >
              <img
                src={userInfo.image}
                alt="user_image"
                className="rounded-circle mr-1"
                style={{ width: "45px" }}
              />

              {userInfo.name}
            </Link>
            <li className="list-group-item ">
              <i
                className="fab fa-facebook-messenger mr-2"
                style={{
                  color: "blueviolet",
                }}
              ></i>
              Messenger
            </li>
            <li className="list-group-item">
              <i className="far fa-calendar-alt mr-2 text-danger"></i> Events
            </li>
            <li className="list-group-item">
              <i className="fas fa-user-friends mr-2 text-info"></i> Friends
            </li>
            <li className="list-group-item">
              <i className="fas fa-users mr-2 text-primary"></i> Groups
            </li>
            <li className="list-group-item ">
              <i className="fas fa-star text-warning"></i> Favorite
            </li>
            <li className="list-group-item">
              <i className="far fa-bookmark mr-2 text-danger"></i> Saved
            </li>
            <li className="list-group-item ">
              <i className="far fa-clock  mr-2 text-primary"></i> Memories
            </li>
            <li className="list-group-item">
              <i className="fas fa-cloud-sun-rain mr-2 text-secondary"></i>
              Weather
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Aside;
