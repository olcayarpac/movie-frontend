import React, { Component } from "react";

// TODO: go to homepage after sign up


export default class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            details: {
                name: "",
                surname: "",
                username: "",
                email: "",
                password: ""
            },
            errorMessage: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault()

        var formBody = []

        for (var data in this.state.details) {
            formBody.push(data + "=" + this.state[data]);
        }

        formBody = formBody.join("&");

        fetch('http://localhost:8000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        }).then(response => {
            if (response.ok) {
                this.props.changeLoginStatus(document.cookie.split('=')[1]);
            }
            else {
                let getJson = (response) => {
                    return response.json();
                }
                getJson(response).then((asJson) => {
                    this.setState({ errorMessage: asJson.msg });
                })

            }
        })

    }

    handleChange(event) {
        var cname = event.target.className;
        this.setState({ [cname.split(" ")[0]]: event.target.value })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form">
                <h3>Sign Up</h3>

                {
                    this.state.errorMessage ?
                        <div className="form-group">
                            <label>{this.state.errorMessage}</label>
                        </div>
                        : null
                }

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" onChange={this.handleChange} className="name form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" onChange={this.handleChange} className="surname form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" onChange={this.handleChange} className="username form-control" placeholder="Username" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" onChange={this.handleChange} className="email form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={this.handleChange} className="password form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered ? <a href="/login">Sign In</a>
                </p>
            </form>
        );
    }
}