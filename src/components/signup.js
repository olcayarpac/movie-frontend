import React, { Component } from "react";

export default class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            surname: "",
            username: "",
            email: "",
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault()
        console.log(this.state);

        var formBody = []

        for (var data in this.state) {
            var encodedKey = encodeURIComponent(data);
            var encodedValue = encodeURIComponent(this.state[data]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");
        console.log(formBody);

        /*fetch('https://example.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
        body: formBody
})*/

    }

    handleChange(event) {
        var cname = event.target.className;
        this.setState({ [cname]: event.target.value })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form">
                <h3>Sign Up</h3>

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
                    Already registered <a href="/login">sign in?</a>
                </p>
            </form>
        );
    }
}