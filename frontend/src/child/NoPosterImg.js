/**
 * Function that renders the image of a poster that does not exist
 */

import React from 'react';
import NoPoster from '../img/noPosterImage.svg';
import styled from "styled-components";

const Poster = styled.div`
    img{
       display: block;
       margin: auto;
    }
    
    h5{
        position: absolute;
        top: 50%;
        left: 50%;
        color: white;
        transform: translate(-50%, -50%);
        text-shadow: -2px -2px #428bca;
    }
`;

export default function NoPosterImg(props){
    return(
        <Poster>
            <h5>{props.tvTitle}</h5>
            <img src={NoPoster} alt={props.tvTitle ? props.tvTitle : "No Poster Image"}/>
        </Poster>
    )
}