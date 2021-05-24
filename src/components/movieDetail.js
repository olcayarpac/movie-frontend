import React, { Component } from 'react';
import "./movieDetail.css";
import axios from "axios";
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MovieCard from "./movieCard";


export default class Moviepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userid: "607ddaf5ca9c6d3072897f2e",
            movieid: window.location.href.substr(window.location.href.lastIndexOf('/') + 1),
            movie: {

            },
            star: 0,

        }

        this.getMovieDetails();
        this.rateMovie = this.rateMovie.bind(this);
    }


    rateMovie(givenStar) {
        if (givenStar) {
            var formBody = []
            formBody.push('userid=' + this.state.userid)
            formBody.push('movieid=' + this.state.movie._id)
            formBody.push('star=' + givenStar)
            formBody = formBody.join("&");

            fetch('http://localhost:8000/api/likeMovie', {
                method: 'post',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                body: formBody
            }).then(() => this.setState({ star: givenStar }));


        }
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
            this.setState({ movie: response.data, star: response.data.star });
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
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend" />
                            <Rating
                                name="simple-controlled"
                                value={this.state.star}
                                onChange={(event, newValue) => {
                                    this.rateMovie(newValue);
                                }}
                            />
                        </Box>

                    </div>
                    <div className="title">
                        {this.state.movie.title + " ( " + this.state.movie.year + " ) "}

                    </div>


                    {
                        /*
                        <div className="genres">
                            {"Genres: " + this.state.movie.genres}

                        </div>
                        */

                    }
                    <div className="duration">
                        <h5 style={{ color: 'black' }}>IMDB : </h5> {this.state.movie.imdb}
                    </div>

                    <div >
                        <h5 style={{ color: 'black' }}>Director : </h5>  {this.state.movie.director}

                    </div>
                    <div >
                        <h5 style={{ color: 'black' }}>Actors : </h5> {this.state.movie.actors}

                    </div>

                    {
                        /*
                        <div style={{ color: 'red' }}>Description</div>
                        */
                    }

                    <div >
                        <h5 style={{ color: 'black' }}>Description : </h5> {this.state.movie.description}
                    </div>
                    <div>
                        <MovieCard userid={this.state.userid} movieId={this.state.movieid} type='getDescriptionRecommendation' />
                    </div>
                </div>

            </div>


        )
    }
}