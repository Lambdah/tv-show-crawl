import React, {useEffect} from 'react';
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
   max-width: ${props => props.maxImage.width};
   max-height: ${props => props.maxImage.height};
   
   min-width: ${props => props.maxImage.width};
   min-height: ${props => props.maxImage.height};
   ${LinkPoster}:hover & {
      opacity: 0.3;
   }
`;

const Play = styled.div`
    opacity: 0.0;
    position: absolute;
    left: 50%;
    color: black;
    
    ${LinkPoster}:hover &{
       opacity: 0.8;
    }
`;


export default function EpisodeCard(props){
    const imageSize = {
      width: `${props.sizeWidth}px`,
      height: `${props.sizeWidth*0.56249992968}px`
    };

    useEffect(() => {
        window.$('[data-toggle="tooltip"]').tooltip();
    }, []);

        return(
            <div className="card-body">

                <LinkPoster data-toggle="tooltip" data-placement="top" title={props.description} href={props.link}>
                    <Image className="rounded mx-sm-auto d-block" maxImage={imageSize} src={resizeImgUrl(props.poster, props.sizeWidth)} alt="Episode Poster" />
                    <Play className="row text-center">PLAY</Play>
                </LinkPoster>

                <Link to={`/show/${props.show}`}><h5 className="card-title text-dark">{props.show}</h5></Link>
                <h5 className="card-text text-dark">(S{props.season}E{props.episode}) {props.title}</h5>
            </div>
        )

}