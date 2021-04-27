import { Component } from "react";
import postServies from "../services/postServies";
import userService from "../services/userService";
import Post from "./post/post";
import { Link } from "react-router-dom";

class Profile extends Component {
  state = {
    posts: [],
    user: "",
  };

  componentDidMount() {
    this.setDataFromServer();
  }

  async setDataFromServer() {
    const { data } = await postServies.myPosts();
    const user = await userService.userInfo();
    this.setState({ posts: data, user });
  }

  hendleDelete = async (id) => {
    await postServies.deletePost(id);
    this.setDataFromServer();
  };

  render() {
    const { posts, user } = this.state;
    const iconPosition = {
      position: "absolute",
      right: "40px",
    };
    return (
      <div className="col-lg-9 " style={{ marginTop: "120px" }}>
        <div className="row border-bottom p-3 mb-5 col-lg-11 ml-5">
          <img
            src={user.image}
            className="rounded-circle col-lg-3"
            style={{ width: "150px" }}
            alt=""
          />
          <div className="col-lg-9 ">
            <h4>
              {user.name}
              <Link
                to={`/edit-user/${user._id}`}
                className="btn border ml-2 mb-2 py-1"
              >
                Edit Profile
              </Link>
            </h4>
            <div className="row col-7 justify-content-between">
              <p>{posts.length} Posts</p>
              <p> 1,146 followers</p>
              <p> 477 following</p>
            </div>
            <p className="w-75">{user.bio}</p>
          </div>
        </div>
        <div className="row ">
          {!posts.length ? (
            <div
              className="text-center text-secondary"
              style={{ marginLeft: "350px", marginTop: "40px" }}
            >
              <i
                className="far fa-address-card p-2"
                style={{ fontSize: "50px" }}
              ></i>
              <p style={{ fontSize: "30px" }}>Upload a Video</p>
              <p>Share your first post with the world.</p>
              <Link to={"./home"} className="btn px-4 py-1 btn-primary mt-2">
                Upload
              </Link>
            </div>
          ) : null}
          {posts.map((post) => {
            return (
              <div className="col-lg-4 mb-5">
                <Post
                  key={post._id}
                  post={post}
                  user={user}
                  onDelete={() => this.hendleDelete(post._id)}
                  iconPosition={iconPosition}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Profile;
