import React, { Component } from 'react';
import axios from 'axios';
import "./movieCard.css";

export default class movieCard extends Component {
    constructor(props) {
        super(props);


        this.state = {
            //antman 478970 batman 2975590 skyfall 1074638  buz devri 268380
            movies: []
        }
        this.getRecommendation = this.getRecommendation.bind(this);
        this.goMoviePage = this.goMoviePage.bind(this);
        this.getRecommendation();
        console.log('movie card rendered')
    }

    getRecommendation() {


        axios.request({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/getLikedMovieRandom',
            params: { userid: this.props.userid }
        }).then((response) => {
            this.setState({movieid: response.data.movieid});
            console.log(this.props.movieid)
            const options = {
                method: 'GET',
                url: ('http://127.0.0.1:8000/api/' + this.props.type),
                params: { movieid: this.props.movieId ? this.props.movieId : response.data.movieid }
            };

            axios.request(options).then((response) => {
                this.getMovieName()
                console.log(response.data)
                this.setState({ 'movies': response.data });
            }).catch((error) => {
                console.error(error);
            });
        }).catch((error) => {
            console.error(error);
        });

    }

    getMovieName() {
        axios.request({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/getName',
            params: { movieid: this.props.movieId ? this.props.movieId : this.state.movieid }

        }).then((response) => {
            this.setState({ 'title': response.data.title });
        }).catch((error) => {
            console.error(error);
        });
    }

    goMoviePage(event) {
        window.location.href = ('/movieDetail/' + event.target.id)
    }


    render() {
        return (
            <div className="movie-card-wrapper">
                {this.props.movieId ? <span></span> : <div className="recInfo"><h4>Similar to {this.state.title}</h4></div>}
                {this.state.movies.map(item => (
                    <li className="posterLi" key={item.movieid}>
                        <img className="poster" title="hover" onClick={this.goMoviePage} id={item.movieid} alt={item.movieid} src={item.poster_url} ></img>
                    </li>
                ))}
            </div>
        );
    }


}
