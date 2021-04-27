import React, { Component } from "react";
import userService from "../../services/userService";
import Chat from "./chat";
import { Link } from "react-router-dom";

class Contacts extends Component {
  state = {
    isAboutVisible: false,
    userInfo: "",
    allUsers: [],
  };

  async componentDidMount() {
    const userInfo = await userService.userInfo();
    const allUsers = await userService.getAll();
    this.setState({ userInfo, allUsers });
  }

  render() {
    const { userInfo, allUsers } = this.state;
    const paramId = this.props.match.params.id;

    return (
      <div className="col-lg-3 mt-4">
        <ul className="list-group list " style={{ marginLeft: "60px" }}>
          <div className=" p-1 border-bottom">
            <span className="ml-1"> Contacts </span>
            <span className="text-secondary" style={{ marginLeft: "170px" }}>
              <i className="fas fa-search mr-2"></i>
              <i className="fas fa-video  "></i>
            </span>
          </div>
          {this.state.isAboutVisible ? (
            <button
              style={{ position: "absolute", top: "70px", right: "18px" }}
              onClick={() => this.setState({ isAboutVisible: false })}
              className="fas fa-times close "
            ></button>
          ) : null}
          {this.state.isAboutVisible ? (
            <Chat userInfo={userInfo} paramId={paramId} />
          ) : null}
          {allUsers.map((user) => {
            return (
              <Link
                key={user._id}
                to={`/home/${user._id}`}
                className=" text-dark text-decoration-none"
              >
                <li
                  className="list-group-item d-flex align-items-center p-1 rounded"
                  onClick={() => this.setState({ isAboutVisible: true })}
                >
                  <img
                    src={user.image}
                    alt="user_image"
                    className="rounded-circle mr-2"
                    style={{ width: "35px" }}
                  />
                  {user.name}
                  <span className="text-success ml-auto">
                    <i
                      className="fas fa-circle"
                      style={{ fontSize: "12px" }}
                    ></i>
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Contacts;
