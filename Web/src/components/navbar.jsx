import { Link, NavLink } from "react-router-dom";

const Navbar = ({ user, userInfo }) => {
  return (
    <>
      {user && (
        <nav className="navbar navbar-expand-sm navbar-light text-white bg-primary shadow-sm fixed-top ">
          <Link to="/home">
            <img
              src="https://lh4.googleusercontent.com/proxy/Hou5AdDTxGIJSqXr9oowT11l0Yx_Z_G0oUGqORiRcKk8TzM3N02ktpnZ0hB4MufL88SzSzTKfontpp__m35V9qRsvGgBQoxnVS2e42qIiDS-Vm4=s0-d"
              style={{ width: "120px" }}
              alt=""
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExample03"
            aria-controls="navbarsExample03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarsExample03">
            <ul className="navbar-nav mx-auto mt-1 ">
              <li className="nav-item">
                <NavLink to="/home" className="nav-link">
                  <i className="fas fa-home i mx-5"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/profile" className="nav-link">
                  <i className="fas fa-user-alt i mx-5"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/home" className="nav-link">
                  <i className="fab fa-facebook-messenger i mx-5 "></i>
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink to="/home" className="nav-link">
                  <i className="fas fa-users i mx-5"></i>
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav mt-1 ">
              <li className="nav-item">
                <NavLink to="/profile" className="nav-link text-white">
                  <img
                    src={userInfo.image}
                    alt=""
                    className="rounded-circle mr-1"
                    style={{ width: "35px" }}
                  />
                  {userInfo.name}
                </NavLink>
              </li>
              <li className="nav-item dropdown mt-1">
                <div
                  className="dropdown"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-chevron-circle-down i mt-2 "></i>
                </div>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="/profile" className="dropdown-item border-bottom ">
                    <img
                      src={userInfo.image}
                      alt="user_image"
                      className="rounded-circle mr-1"
                      style={{ width: "35px" }}
                    />
                    {userInfo.name}
                    <br />
                    <span
                      className="text-muted ml-4"
                      style={{ fontSize: "14px" }}
                    >
                      see your profile
                    </span>
                  </Link>
                  <Link to="/home" className="dropdown-item text-center p-3">
                    <i className="far fa-question-circle"></i>{" "}
                    <span style={{ fontSize: "14px" }}>Help & support</span>
                  </Link>
                  <Link to="/logout" className="dropdown-item text-center">
                    <i className="fas fa-sign-out-alt  text-danger"></i> Log Out
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
