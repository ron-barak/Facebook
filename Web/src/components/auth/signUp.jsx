import Form from "../common/form";
import Joi from "joi-browser";
import http from "../../services/http";
import { apiUrl } from "../../config.json";
import userService from "../../services/userService";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class SignUp extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
      phone: "",
      address: "",
      bio: "",
      image: "",
    },
    errors: {},
  };

  async doSubmit() {
    const { image, ...data } = this.state.data;
    if (image) {
      data.image = image;
    }
    try {
      await http.post(`${apiUrl}/users`, data);
      toast.info(`Welcome to Facebook ${data.name}`);
      this.props.history.replace("/");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({ errors: err.response.data.errors });
      }
    }
  }
  schema = {
    _id: Joi.string(),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
    name: Joi.string().min(2).required().label("Name"),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label(" Phone"),
    address: Joi.string().min(2).max(400).required().label("Address"),
    bio: Joi.string().min(2).max(400).required().label("Bio"),
    image: Joi.string().min(11).max(1024).uri().allow("").required(),
  };

  render() {
    if (userService.getCurrentUser()) {
      return <Redirect to="/" />;
    }
    return (
      <div
        className="col-lg-4 mx-auto m-5 shadow-lg bg-white p-4"
        style={{ borderRadius: "14px" }}
      >
        <Link to="/">
          <i onClick={this.hendleCancel} className="fas fa-times close"></i>
        </Link>
        <div className="text-center">
          <h1 className="text-primary mt-4">SignUp for Facebook</h1>
          <p>You can open a new account for free</p>
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
              {this.renderButtonCenter("Sign up")}
              <Link to="/">
                <button className="btn btn-danger mt-3 mx-auto">Cancel</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
