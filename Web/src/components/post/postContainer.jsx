import { Component } from "react";
import postServies from "../../services/postServies";
import userService from "../../services/userService";
import CreatePost from "./createPost";
import Post from "./post";

class PostContainer extends Component {
  state = {
    posts: [],
    user: "",
  };

  componentDidMount() {
    this.setDataFromServer();
  }

  setDataFromServer = async () => {
    const posts = await postServies.getAll();
    const user = await userService.userInfo();
    this.setState({ posts, user });
  };

  hendleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await postServies.deletePost(id);
      this.setDataFromServer();
    }
  };

  render() {
    const { posts, user } = this.state;
    const iconPosition = {
      position: "absolute",
      right: "100px",
    };
    return (
      <div className="col-lg-6 mx-auto">
        <div style={{ width: "620px", marginLeft: "54px" }}>
          <CreatePost user={user} setDataFromServer={this.setDataFromServer} />
          {posts.map((post) => {
            return (
              <Post
                key={post._id}
                post={post}
                user={user}
                onDelete={() => this.hendleDelete(post._id)}
                iconPosition={iconPosition}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default PostContainer;
