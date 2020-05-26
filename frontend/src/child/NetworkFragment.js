import React, { useState, useRef, useCallback } from 'react';
import useNetworkFetch from "../helper/useNetworkFetch";
import NoPosterImg from "./NoPosterImg";
import {Link} from "react-router-dom";
import styled from "styled-components";

const PosterShow = styled.div`
    .poster-class{
        height: 27.5em;
        width: 15em;
        padding-right: 1em;
        background-color: lightgrey;
        min-height: 93.5%;
        min-width: 20.5em;
        img {
            width: 84%;  
        }
     }
        
    @media (min-width: 1199px){
        .poster-class{
            
        img {
            max-width: 90%;  
        }
    }
        
    @media (max-width: 991px){
        .poster-class{
            img {
            width: 80%;
            }  
        }
            
      
    }
    
    @media (max-width: 767px){
        .poster-class{
                
            img {
                width: 80%;
            }  
        }
    }
    
    img{
       display: block;
       margin: auto;
       padding: 1em 0em 2em 0em;
    }
     
`;

export default function NetworkFragment(props){
    const [network] = useState(props.network);
    const [pageNumber, setPageNumber] = useState(0);
    const observer = useRef();
    const {
        loading,
        hasMore,
        shows,
        error
    } = useNetworkFetch(network, pageNumber, 12);

    const lastShowRef = useCallback(node => {
        if (loading) return;
        if (observer.current){
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore){
                setPageNumber(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    return(
        <>
            <div className="row">
                {shows.map((tvShow, index) =>
                    <PosterShow key={tvShow._id}>
                        <div className="col-4 my-3 m-1 poster-class rounded border border-primary" ref={shows.length === index + 1 ? lastShowRef : null}>
                            {tvShow.hasOwnProperty("episodeCount") ? <p className="text-primary">{tvShow.episodeCount} Episodes</p>
                                : <p className="text-secondary">No Episodes</p>
                            }
                            {tvShow.poster !== "N/A" ?
                                <img src={tvShow.poster} alt={tvShow.title} className="rounded"/>
                                :
                                <>
                                <NoPosterImg title={tvShow.title}/>
                                </>
                            }
                                <Link to={`/show/${tvShow.title}`} className="stretched-link" aria-hidden={true} />
                        </div>
                    </PosterShow>
                )}
            </div>
            <div className="display-2 loading-text">{loading && 'Loading...'}</div>
            <div className="display-3 error-text">{error && 'Error'}</div>
        </>
    )
}