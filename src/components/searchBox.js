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

    onInputFocus(event) {
        console.log('onfocus');
        this.setState({showResults: true})
    }

    onInputBlur(event) {
        console.log('blur');
        console.log(event.target)
        this.setState({showResults: false})
        this.setState({movies: []})

    }

    goMoviePage(event){
        window.open('https://www.imdb.com/title/tt' + event.target.id.padStart(7, '0'));
    }

    render() {
        return (
            <div className='wrapper' >
                <div className='search' /*onBlur={this.onInputBlur} onFocus={this.onInputFocus}*/>
                    <input className='searchInput' placeholder='Search' onChange={this.search}/>
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
        );
    }
}
