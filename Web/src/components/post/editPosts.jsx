import Form from "../common/form";
import Joi from "joi-browser";
import postServies from "../../services/postServies";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class EditPosts extends Form {
  state = {
    data: {
      postBody: "",
    },
    errors: {},
  };

  async componentDidMount() {
    const postId = this.props.match.params.id;
    const { data } = await postServies.postInfo(postId);
    this.setState({ data: this.mapDataToState(data) });
  }

  async doSubmit() {
    const { data } = this.state;
    await postServies.updatePost(data);
    this.props.history.replace("/home");
    toast.info("Post updated successfully");
  }

  mapDataToState(data) {
    return {
      _id: data._id,
      postBody: data.postBody,
    };
  }

  schema = {
    _id: Joi.string(),
    postBody: Joi.string().min(2).max(1024).required().label("post Body"),
  };
  render() {
    return (
      <div
        className="col-5 shadow-lg bg-white p-4"
        style={{ margin: "170px 106px", borderRadius: "14px" }}
      >
        <h1 className="text-center text-primary display-4">Edit post</h1>
        <div className="row">
          <div className="col-lg-11 mx-auto">
            <form noValidate onSubmit={this.handleSubmit}>
              {this.renderTextarea("postBody")}
              {this.renderButtonCenter("Update")}
              <Link to="/home">
                <button className="btn btn-danger mt-4 ">Cancel</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditPosts;
