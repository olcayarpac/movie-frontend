import React, { Component } from "react";
import axios from "axios";
import SearchBox from "./searchBox";

export default class Homepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
        }

        this.checkAuth = this.checkAuth.bind(this);
        this.checkAuth();
    }


    // check login status by using cookies
    checkAuth() {
        /*
        const options = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: { i: 'tt4154796', r: 'json' },
            headers: {

            }
        };

        axios.request(options).then( (response) => {
            this.setState({'imgurl': response.data.Poster});
        }).catch( (error) => {
            console.error(error);
        });
        */
    }



    render() {
        return (
            <div>
                <SearchBox />
            </div>
        );
    }
}