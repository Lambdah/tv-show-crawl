import React from 'react';
import resizeImgUrl from '../helper/resizeImgUrl';
import styled from "styled-components";

const Link = styled.a`
   display:flex;
   align-items: center;
`;

const Image = styled.img`
   opacity: 1.0;
   transition: 0.5s ease;
   
   ${Link}:hover & {
      opacity: 0.3;
   }
`;

const Play = styled.div`
    opacity: 0.0;
    position: absolute;
    bottom: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: black;
    
    ${Link}:hover &{
       opacity: 0.8;
    }
`;

export default function EpisodeCard(props){
        return(
            <div className="card-body">
                <Link href={props.episode_url}>
                        <Image className="rounded float-center" src={resizeImgUrl(props.poster, props.sizeWidth)} alt="Episode poster" />
                        <Play>PLAY</Play>
                </Link>

                <h5 className="card-title text-dark">{props.title}</h5>
                <h5 className="card-text text-dark">{props.episode}</h5>
                <p className="card-text">{props.description}</p>
            </div>
        )

}