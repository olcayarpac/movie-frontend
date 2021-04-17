import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
        }

        this.checkAuth = this.checkAuth.bind(this);
        this.checkAuth();
    }


    checkAuth() {

        console.log(this.state.imgurl);
        const options = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: { i: 'tt4154796', r: 'json' },
            headers: {
                'x-rapidapi-key': 'cdfd6ae0bamshab670431d96d5ffp19e3a4jsn0ace9484330a',
                'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
            }
        };

        axios.request(options).then( (response) => {
            this.setState({'imgurl': response.data.Poster});
        }).catch( (error) => {
            console.error(error);
        });
        
    }



    render() {
        return (
            <div>
                <h1>HOMEPAGE</h1>
                <img alt="Diriliş Poster" title="Diriliş Poster" src={this.state.imgurl}></img>
            </div>
        );
    }
}