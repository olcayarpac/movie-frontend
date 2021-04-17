import React, { Component } from "react";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            errorMessage: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }


    handleSubmit(event) {
        event.preventDefault()
        var formBody = []

        for (var data in this.state) {
            formBody.push(data + "=" + this.state[data]);
        }

        formBody = formBody.join("&");

        fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        }).then(response => {

            let getJson = (response) => {
                return response.json();
            }

            if (response.ok) {
                getJson(response).then((asJson) => {
                    this.props.changeLoginStatus(asJson.id, this.state.username);
                })
            }
            
            else {

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
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                {
                    this.state.errorMessage ?
                        <div className="form-group">
                            <label>{this.state.errorMessage}</label>
                        </div>
                        : null
                }

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" onChange={this.handleChange} className="username form-control" placeholder="Enter username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={this.handleChange} className="password form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>


                <button type="submit" className="btn btn-primary btn-block">Submit</button>

                {/*
                    <p className="forgot-password text-right">
                        Forgot <a >password?</a>
                    </p>*/
                }

                <p className="forgot-password text-right">
                    Don't have account ? <a href="/signup">Sign Up</a>
                </p>
            </form>
        );
    }
}