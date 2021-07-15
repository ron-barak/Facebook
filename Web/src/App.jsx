import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import SignUp from "./components/auth/signUp";
import SignIn from "./components/auth/signin";
import Logout from "./components/auth/logout";
import { Component } from "react";
import userService from "./services/userService";
import Aside from "./components/aside";
import PostContainer from "./components/post/postContainer";
import EditPosts from "./components/post/editPosts";
import Profile from "./components/profile";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditUser from "./components/editUser";
import Contacts from "./components/chat/contacts";

class App extends Component {
  state = {
    user: "",
    userInfo: "",
  };
  async componentDidMount() {
    const user = await userService.getCurrentUser();
    if(user){
    const userInfo = await userService.userInfo();
    this.setState({ user, userInfo });
    }
     this.setState({ user}
  }

  render() {
    const { user, userInfo } = this.state;
    return (
      <div className="App">
        <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />
        <header>
          <Navbar user={user} userInfo={userInfo} />
        </header>
        <main className="container-fluid flex-fill">
          <div className="row">
            <Aside userInfo={userInfo} />
            <Switch>
              <Route
                path="/PageNotFound"
                render={() => <i>404 Page Not Found</i>}
              />
              <Route path="/edit-user/:id" component={EditUser} />
              <Route path="/my-posts/edit/:id" component={EditPosts} />
              <Route path="/home" component={PostContainer} />
              <Route path="/profile" component={Profile} />
              <Route path="/signUp" component={SignUp} />
              <Route path="/logout" component={Logout} />
              <Route path="/" component={SignIn} exact />
              <Redirect to="/PageNotFound" />
            </Switch>
            <Switch>
              <Route path="/home/:id" component={Contacts} />
              <Route path="/home" component={Contacts} />
            </Switch>
          </div>
        </main>
        {!user && (
          <footer>
            <Footer />
          </footer>
        )}
      </div>
    );
  }
}

export default App;
