import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/signup";
import Homepage from "./components/homepage";
import Account from "./components/account";
import MovieCard from "./components/movieCard";

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      authenticated: true,
      userid: 123456
    }


    this.changeLoginStatus = this.changeLoginStatus.bind(this)
    this.forDebug = this.forDebug.bind(this)

  }

  changeLoginStatus(uId, uName) {
    this.setState(
      {
        authenticated: true,
        userid: uId,
        username: uName,
      })
  }

  forDebug() {
    console.log(this.state)
  }


  render() {
    return (<Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/"} onClick={this.forDebug}>Movie Recommendation</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              {
                !this.state.authenticated ?

                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to={"/login"}>Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/signup"}>Sign up</Link>
                    </li>
                  </ul>
                  :
                  <ul className="navbar-nav ml-auto">
                    <li className="nam-item">
                      <div className="nav-link">
                        Hello {this.state.username}!
                      </div>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/account"}>Account</Link>
                    </li>
                  </ul>
              }

            </div>
          </div>
        </nav>

        <div className="content">

          <Switch>
            <Route exact path="/">
              {
                this.state.authenticated ? <Homepage userId={this.state.userId} /> : <Redirect push to="/signup" />
              }
            </Route>

            <Route path="/login">
              {
                !this.state.authenticated ?
                  <div className="auth-wrapper">
                    <div className="auth-inner">
                      <Login changeLoginStatus={this.changeLoginStatus} />
                    </div>
                  </div> : <Redirect push to="/" />
              }
            </Route>

            <Route path="/signup">
              {
                !this.state.authenticated ?
                  <div className="auth-wrapper">
                    <div className="auth-inner">
                      <SignUp changeLoginStatus={this.changeLoginStatus} />
                    </div>
                  </div> : <Redirect push to="/" />
              }
            </Route>

            <Route path="/account">
              {
                this.state.authenticated ? <Account userid={this.state.userid} /> : <Redirect push to="/login" />
              }
            </Route>
            <Route path="/recommendations">
              <MovieCard />
            </Route>
          </Switch>

        </div>
      </div>
    </Router>

    );
  }

}