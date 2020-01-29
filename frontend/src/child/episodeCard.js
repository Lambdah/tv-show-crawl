import React from 'react';

export default class EpisodeCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = [];
    }

    render(){
        return(
            <div className="card-body">
                <img className="rounded float-left" src={this.props.poster} alt="Episode poster" />
                <div className="card-img-overlay text-dark">
                    <h5 className="card-title text-light">{this.props.title}</h5>
                    <h5 className="card-text text-light">{this.props.episode}</h5>
                </div>
                <p className="card-text">{this.props.description}</p>
            </div>
        )
    }
}