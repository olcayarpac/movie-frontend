import React, { Component } from "react";
import "./searchBox.css";
import axios from "axios";

export default class SearchBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showResults: false,
            movies: [],
        }

        this.search = this.search.bind(this);
        this.onInputFocus = this.onInputFocus.bind(this);
        this.onInputBlur = this.onInputBlur.bind(this);
        this.goMoviePage = this.goMoviePage.bind(this);

    }


    search(event) {
        if ((event.target.value != null) && (event.target.value !== '')) {
            const options = {
                method: 'GET',
                url: 'http://127.0.0.1:8000/api/searchTitle',
                params: { 'title': event.target.value }
            };

            axios.request(options).then((response) => {
                this.setState({ movies: response.data });
            }).catch((error) => {
                console.error(error);
            });
        }
        else{
            this.setState({movies: []})
        }
    }

    onInputFocus(event) {
        this.setState({ showResults: true })
    }

    onInputBlur(event) {
        setTimeout(() => {
            //your code to be executed after 1 second
            this.setState({ showResults: false })
          }, 200);
    }

    goMoviePage(event) {
        window.open('https://www.imdb.com/title/tt' + event.target.id.padStart(7, '0'));
    }

    render() {
        return (
            <div className='searchWrapper' >
                <div className='search' onFocus={this.onInputFocus} onBlur={this.onInputBlur}>
                    <input className='searchInput' placeholder='Search' onChange={this.search} />
                    <div className='searchResults'>
                        {
                            this.state.movies.map((movie) => {
                                return <div onClick={this.goMoviePage} key={movie._id} id={movie._id}  
                                    className={this.state.showResults ? 'searchResult show' : 'searchResult hide'}>
                                    {movie.title}
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
