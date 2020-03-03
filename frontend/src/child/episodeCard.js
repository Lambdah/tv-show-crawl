import React from 'react';
import resizeImgUrl from '../helper/resizeImgUrl';

export default function EpisodeCard(props){
        return(
            <div className="card-body">
                <img className="rounded float-center" src={resizeImgUrl(props.poster, props.sizeWidth)} alt="Episode poster" />
                <div className="card-img-overlay text-dark">
                    <h5 className="card-title text-light">{props.title}</h5>
                    <h5 className="card-text text-light">{props.episode}</h5>
                </div>
                <p className="card-text">{props.description}</p>
                <a href={props.episode_url} className="btn btn-success stretched-link">Watch Episode</a>
            </div>
        )

}