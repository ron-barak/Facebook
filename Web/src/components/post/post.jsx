import React from "react";
import { Link } from "react-router-dom";
import postServies from "../../services/postServies";

const Post = ({ post, user, onDelete, iconPosition }) => {
  return (
    <>
      <div key={post._id} className="shadow-lg bg-white mb-3 post ">
        {user._id === post.user_id && (
          <div className="dropdown" style={iconPosition}>
            <div
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ cursor: "pointer" }}
            >
              <i
                className="fas fa-ellipsis-h mt-4 text-dark"
                style={{
                  fontSize: "18px",
                }}
              ></i>
            </div>
            <div
              className="dropdown-menu text-center dropdown_post"
              aria-labelledby="dropdownMenu2"
            >
              <Link className="dropdown-item" to={`/my-posts/edit/${post._id}`}>
                <i className="far fa-edit"></i> Edit post
              </Link>

              <button
                onClick={onDelete}
                className="dropdown-item"
                type="button"
              >
                <i className="fas fa-trash-alt text-danger"></i> Delete post
              </button>
            </div>
          </div>
        )}
        <div className="p-4">
          <div className="mb-3">
            <img
              src={post.user_img}
              alt=""
              className="rounded-circle mr-2"
              style={{ width: "45px", float: "left" }}
            />

            <p>
              {post.user_name}
              <br />
              <span className="text-muted" style={{ fontSize: "13px" }}>
                {postServies.timeConvert(
                  Math.ceil((Date.now() - new Date(post.createdAt)) / 1000 / 60)
                )}
              </span>

              <i
                className="fas fa-globe-americas text-muted"
                style={{ fontSize: "10px" }}
              ></i>
            </p>
          </div>
          <p>{post.postBody}</p>
        </div>
      </div>
    </>
  );
};

export default Post;
