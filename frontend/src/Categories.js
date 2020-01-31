import React from 'react';


export default class Categories extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            genres: ["Comedy", "Animation", "Game-Show"]
        }
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
                    <form>
                        <div className="form-group row">
                            {this.state.genres.map(genre =>
                                <div className="form-check col-3">
                                    <input className="form-check-input" type="radio" name="categoryRadio" id={genre} value={genre} />
                                    <label className="form-check-label" for={genre}>
                                        {genre}
                                    </label>
                                </div>
                            )}
                        </div>
                        <div className="form-group row">
                            <div className="col-3">
                                <button type="submit" className="btn btn-primary">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}