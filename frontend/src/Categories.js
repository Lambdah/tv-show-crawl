import React from 'react';
import axios from 'axios';


export default class Categories extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            genres: ["Action","Adventure","Animation","Biography","Comedy","Crime","Drama","Fantasy","Game-Show"
                ,"History","Music","Mystery","Reality-TV","Romance","Sci-Fi","Short","Talk-Show"],
            search: "",
            genre: "",
            tvShows: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGenre = this.handleGenre.bind(this);
        this.handleUrl = this.handleUrl.bind(this);
    }

    handleChange(event){
        this.setState({search: event.target.value});
    }

    handleGenre(){
        axios.get(`http://localhost:8018/networks/categories/${this.state.genre}`)
            .then(res => {
                const tvShows = res.data;
                this.setState({tvShows});
            });
    }

    handleSubmit(event){
        this.setState({genre: this.state.search}, this.handleGenre);
        event.preventDefault();
    }

    handleUrl(url){
        return `http://localhost:3000/show/${url}`
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <h3 className="col-0">
                        Categories Search
                    </h3>
                </div>
                <div className="jumbotron">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            {this.state.genres.map(genre =>
                                <div className="form-check col-3 text-left">
                                    <label className="form-check-label ml-5" htmlFor={genre}>
                                    <input className="form-check-input" type="radio" name="categoryRadio" id={genre}
                                           value={genre} checked={this.state.search === genre} onChange={this.handleChange}/>
                                        {genre}
                                    </label>
                                </div>
                            )}
                        </div>{/* jumbotron */}
                        <div className="form-group row ml-3">
                            <div className="col-1">
                                <button type="submit" className="btn btn-primary">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row">
                    {this.state.tvShows.map(tv =>
                        <div className="col-4 my-2">
                            <img className="rounded float-left" src={tv.poster} alt={tv.tvTitle} />
                            <a href={this.handleUrl(tv.tvTitle)} className="stretched-link" aria-hidden="true" />
                        </div>
                    )}
                </div>{/* row */}

            </div>
        )
    }
}