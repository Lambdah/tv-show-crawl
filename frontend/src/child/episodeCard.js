import React from 'react';
import {Link} from 'react-router-dom';
import resizeImgUrl from '../helper/resizeImgUrl';
import styled from "styled-components";

const LinkPoster = styled.a`
   display:flex;
   align-items: center;
   
   .tooltip > .tooltip-inner {
       background-color: purple;
       color: green;
   }
`;

const Image = styled.img`
   opacity: 1.0;
   transition: 0.5s ease;
   
   ${LinkPoster}:hover & {
      opacity: 0.3;
   }
`;

const Play = styled.div`
    opacity: 0.0;
    position: absolute;
    bottom: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: black;
    
    ${LinkPoster}:hover &{
       opacity: 0.8;
    }
`;

function returnURL(url){
    return "http://localhost:3000/show/" + url;
}

export default function EpisodeCard(props){
        return(
            <div className="card-body">
                <LinkPoster data-toggle="tooltip" data-placement="top" title={props.description} href={props.episode_url}>
                        <Image className="rounded float-center" src={resizeImgUrl(props.poster, props.sizeWidth)} alt="Episode poster" />
                        <Play>PLAY</Play>
                </LinkPoster>
                <Link to={`/show/${props.title}`}><h5 className="card-title text-dark">{props.title}</h5></Link>
                <h5 className="card-text text-dark">(S{props.season}E{props.episode_num}) {props.episode}</h5>
            </div>
        )

}