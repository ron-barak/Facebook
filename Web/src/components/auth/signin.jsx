import Form from "../common/form";
import Joi from "joi-browser";
import userService from "../../services/userService";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class SignIn extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  async doSubmit() {
    const { email, password } = this.state.data;

    try {
      await userService.login(email, password);

      const { state: locationState } = this.props.location;
      window.location =
        locationState && locationState.from
          ? locationState.from.pathname
          : "/home";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({ errors: { email: err.response.data } });
      }
    }
  }

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  render() {
    if (userService.getCurrentUser()) {
      return <Redirect to="/" />;
    }
    return (
      <div
        className=" col-lg-4 mx-auto shadow-lg bg-white p-5 mb-4"
        style={{ borderRadius: "14px", marginTop: "100px" }}
      >
        <div className="text-center">
          <h1 className="text-primary">SignIn for Facebook</h1>
          <p>SignIn to your profile</p>
        </div>

        <div className="row">
          <div className="col-lg-10 mx-auto">
            <form noValidate onSubmit={this.handleSubmit}>
              {this.renderInput("email", "Email:", "email")}
              {this.renderInput("password", "Password:", "password")}
              {this.renderButtonCenter("Sign In")}
              <div className="border-top m-4 text-center">
                <Link to="/signUp" className="nav-link">
                  Create new account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
