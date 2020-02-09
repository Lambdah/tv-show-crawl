import React from 'react';
import resizeImgUrl from '../helper/resizeImgUrl';

export default class EpisodeCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = [];
    }

    render(){
        return(
            <div className="card-body">
                <img className="rounded float-center" src={resizeImgUrl(this.props.poster, 200)} alt="Episode poster" />
                <div className="card-img-overlay text-dark">
                    <h5 className="card-title text-light">{this.props.title}</h5>
                    <h5 className="card-text text-light">{this.props.episode}</h5>
                </div>
                <p className="card-text">{this.props.description}</p>
                <a href={this.props.episode_url} className="btn btn-success stretched-link">Watch Episode</a>
            </div>
        )
    }
}