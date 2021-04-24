import React, { Component } from 'react';
import axios from 'axios';
import "./movies.css";

export default class Movies extends Component {
    constructor(props) {
        super(props);


        this.state = {
            movieId: 2975590, //antman 478970 batman 2975590 skyfall 1074638  buz devri 268380
            movies:
                [

                ]
        }
        this.getRecommendation=this.getRecommendation.bind(this);
        this.getRecommendation();
        this.goMoviePage = this.goMoviePage.bind(this);

    }
    getRecommendation() {
        const options = {
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/getRecommendationsByUserLikes',
            params: { movieid:this.state.movieId }
           
        };

        axios.request(options).then((response) => {
            console.log(response.data)
            this.setState({ 'movies': response.data });
        }).catch((error) => {
            console.error(error);
        });
    }


    
    goMoviePage(event){
        console.log('go movie triggered');
        window.open('https://www.imdb.com/title/tt' + event.target.id.padStart(7, '0'));
    }


    render() {
        return (
            <div className="movie-card-wrapper">



                {this.state.movies.map(item => (
                    <li key={item.movieid}>
                        <img className="poster" onClick={this.goMoviePage} id={item.movieid} alt={item.movieid} src={item.posterurl} ></img>
                    </li>
                ))}


            </div>
        );
    }


}
