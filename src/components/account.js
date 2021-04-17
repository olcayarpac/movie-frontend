import React, { Component } from "react";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
        }

        this.checkAuth();
    }

    
    checkAuth(){
        if (this.props.userId == null){

        }
    }
    

    render() {
        return (
            <h1>ACCOUNT</h1>
        );
    }
}