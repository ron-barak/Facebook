import Form from "../common/form";
import Joi from "joi-browser";
import postServies from "../../services/postServies";
import PopupTextarea from "../common/popupTextarea";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
class CreatePost extends Form {
  state = {
    data: {
      postBody: "",
    },
    errors: {},
  };

  doSubmit = async () => {
    const { ...data } = this.state.data;
    await postServies.createPost(data);
    this.props.setDataFromServer();
    toast.info("New post");
  };

  schema = {
    postBody: Joi.string().min(2).max(1024).required().label("post Body"),
  };

  render() {
    const { user } = this.props;
    return (
      <div className="shadow-lg bg-white mb-3" style={{ borderRadius: "16px" }}>
        <form
          className="row col-lg-12 mx-auto w-100 py-3 px-4 "
          style={{ marginTop: "90px" }}
          noValidate
          onSubmit={this.handleSubmit}
        >
          <PopupTextarea renderTextarea={this.renderTextarea("postBody", "")} />
          <Link to="/profile">
            <img
              alt="user_image"
              src={user.image}
              className="rounded-circle"
              style={{ width: "45px" }}
            />
          </Link>
          <div
            className="bg-light p-2 ml-2"
            data-toggle="modal"
            data-target="#exampleModal"
            data-whatever="@mdo"
            style={{ borderRadius: "28px", width: "510px" }}
          >
            <span className="ml-4 text-muted">
              What's on your mind , {user.name}?
            </span>
          </div>
        </form>
        <div
          className=" mx-auto form-icon border-top p-3 text-center row justify-content-around"
          style={{ width: "580px" }}
        >
          <div>
            <Link to="/home">
              <i className="fas fa-images text-success i-creatPost"></i>
            </Link>
            <span> Photo</span>
          </div>

          <div>
            <Link to="/home">
              <i className="far fa-smile text-warning  i-creatPost"></i>
            </Link>
            <span> Feeling</span>
          </div>
          <div>
            <Link to="/home">
              <i className="fas fa-video text-danger  i-creatPost"></i>
            </Link>
            <span> Live video</span>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;
