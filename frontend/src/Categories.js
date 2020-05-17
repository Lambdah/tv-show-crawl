import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import styled from "styled-components";
import NoPosterImg from "./child/NoPosterImg";

const PosterTv = styled.div`

     @media (max-width: 991px){
      img {
            max-width: 80%;
        }  
    }
    
    @media (max-width: 767px){
        img {
            max-width: 80%;
        }
    }

`


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
        axios.get(`${process.env.REACT_APP_SERVER}/networks/categories/${this.state.genre}`)
            .then(res => {
                const tvShows = res.data;
                this.setState({tvShows});
            })
            .catch(err => {
                console.error(err);
            })
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
                    <div className="col-0 display-4 mb-lg-2 mb-4" style={{paddingTop: '100px'}}>
                        Categories Search
                    </div>
                </div>
                <div className="jumbotron">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            {this.state.genres.map((genre, index) =>
                                <div className="form-check col-lg-3 col-md-4 col-sm-6 text-left" key={genre+index}>
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
                        <PosterTv className="col-lg-4 col-md-6 my-2" key={tv._id}>
                            {tv.poster !== "N/A" ?
                                <img className="rounded float-left" src={tv.poster} alt={tv.title} />
                                :
                                <NoPosterImg title={tv.title}/>
                            }

                            <Link to={`/show/${tv.title}`} className="stretched-link" aria-hidden="true" style={{fontSize: 0}}>Link to {tv.title}</Link>
                        </PosterTv>
                    )}
                </div>{/* row */}

            </div>
        )
    }
}