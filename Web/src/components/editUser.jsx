import Form from "./common/form";
import Joi from "joi-browser";
import userService from "../services/userService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class EditUser extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
      phone: "",
      address: "",
      image: "",
      bio: "",
    },
    errors: {},
  };

  async componentDidMount() {
    const data = await userService.userInfo();
    this.setState({ data: this.mapDataToState(data) });
  }

  async doSubmit() {
    const { image, password, ...data } = this.state.data;
    if (image) {
      data.image = image;
    }
    if (password) {
      data.password = password;
    }
    await userService.updateUser(data);
    this.props.history.replace("/profile");
    toast.info("User successfully updated");
  }
  mapDataToState(data) {
    return {
      _id: data._id,
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
      address: data.address,
      image: data.image,
      bio: data.bio,
    };
  }

  schema = {
    _id: Joi.string(),
    name: Joi.string().min(2).max(255).required().label("Name"),
    email: Joi.string().min(6).max(255).required().email().label("Email"),
    password: Joi.string().min(6).max(1024).label("Password").allow(""),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label("Phone"),
    address: Joi.string().min(2).max(400).required().label("Address"),
    image: Joi.string().min(11).max(1024).uri().allow("").required(),
    bio: Joi.string().min(2).max(400).required().label("Bio"),
  };

  render() {
    return (
      <div
        className="col-lg-4 shadow-lg bg-white p-4 "
        style={{ margin: "120px 162px", borderRadius: "14px" }}
      >
        <Link to="/profile">
          <i onClick={this.hendleCancel} className="fas fa-times close"></i>
        </Link>
        <div className="text-center">
          <div className="text-primary display-4 mb-2">Edit Profile</div>
          <p className="mb-4">You can open a new account for free</p>
        </div>

        <div className="row">
          <div className="col-lg-11 mx-auto ">
            <form className="form-row" noValidate onSubmit={this.handleSubmit}>
              <div className="col-lg-6">
                {this.renderInput("email", "Email:", "email")}
              </div>
              <div className="col-lg-6">
                {this.renderInput("password", "Password:", "password")}
              </div>
              <div className="col-lg-6">
                {this.renderInput("name", " Full name:")}
              </div>
              <div className="col-lg-6">
                {this.renderInput("phone", "Phone:")}
              </div>
              <div className="col-lg-12">
                {this.renderInput("address", "Address:")}
              </div>
              <div className="col-lg-12">
                {this.renderInput("image", "Profile Image:")}
              </div>
              <div className="col-lg-12">
                {this.renderTextarea("bio", "Bio:")}
              </div>
              {this.renderButtonCenter("Update user")}
              <Link to="/profile">
                <button className="btn btn-danger mt-4 mx-auto">Cancel</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditUser;
