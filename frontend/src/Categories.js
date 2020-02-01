import React from 'react';


export default class Categories extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            genres: ["Action","Adventure","Animation","Biography","Comedy","Crime","Drama","Fantasy","Game-Show"
                ,"History","Music","Mystery","Reality-TV","Romance","Sci-Fi","Short","Talk-Show"],
            search: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({search: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        alert(`Searching ${this.state.search}`);
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
                                <div className="form-check col-3">
                                    <label className="form-check-label" htmlFor={genre}>
                                    <input className="form-check-input" type="radio" name="categoryRadio" id={genre}
                                           value={genre} checked={this.state.search === genre} onChange={this.handleChange}/>
                                        {genre}
                                    </label>
                                </div>
                            )}
                        </div>
                        <div className="form-group row">
                            <div className="col-1">
                                <button type="submit" className="btn btn-primary">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}