import { render } from '@testing-library/react';
import React, { Component } from 'react';
import star1 from "./star.png";
import "./movieDetail.css";
import axios from "axios";




export default class Moviepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userid: "607ddaf5ca9c6d3072897f2e",
            movieid: 791244,
            movie: {
            }
        }

        this.getMovieDetails();
    }

    getMovieDetails() {

        const options = {
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/getMovieDetails',
            params: {
                'movieid': this.state.movieid,
                'userid': this.state.userid
            }
        };

        axios.request(options).then((response) => {
            this.setState({ movie: response.data });
        }).catch((error) => {
            console.error(error);
        });
    }



    render() {
        return (
            <div className="movie-page">

                <img className="detail-poster" id={this.state.movie.movieId} src={this.state.movie.poster_url}></img>


                <div className="right-side">
                    <div className="star">
                        <img src={star1} />

                    </div>
                    <div className="movie-title">
                        {"Title: " + this.state.movie.title}

                    </div>

                    {
                        /*
                        <div className="genres">
                            {"Genres: " + this.state.movie.genres}

                        </div>
                        */

                        }
                        <div className="duration">
                            {"Duration: " + this.state.movie.imdb}
                        </div>

                    <div className="director">
                        {" Director: " + this.state.movie.director}

                    </div>
                    <div className="country">
                        {" Country: " + this.state.movie.actors}

                    </div>
                    <div className="year">
                        {"Year: " + this.state.movie.year}

                    </div>
                    <div className="description">
                        {"Description: " + this.state.movie.description}
                    </div>
                </div>

            </div>


        )
    }
}

