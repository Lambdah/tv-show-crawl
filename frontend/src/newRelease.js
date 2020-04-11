/**
 * Page for /new_release
 */

import React, { useState, useRef, useCallback } from 'react';
import styled from "styled-components";
import EpisodeCard from './child/episodeCard';
import useEpisodeFetch from "./helper/useEpisodeFetch";

const PageHeader = styled.div`
    h3{
        padding-top: 3em;
    }
`;

export default function NewRelease(){
    const [pagination, setPagination] = useState(0);
    const [pageSize] = useState(16);
    const observer = useRef();
    const {
        loading,
        error,
        episodes,
        hasMore
    } = useEpisodeFetch(pagination, pageSize);

    const lastEpisodeRef = useCallback(node => {
        if (loading) return;
        if (observer.current){
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore){
                setPagination(prevPagination => prevPagination + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    return (
        <div className="container">
            <PageHeader className="row">
                <h3 className="col-0">New Release</h3>
            </PageHeader>
            <div className="row paginate">
                                         {episodes.map((tvShow, index) =>
                             <div className="card col-3 border-0" key={tvShow._id} ref={episodes.length === index + 1 ? lastEpisodeRef : null}>
                                 <EpisodeCard title={tvShow.show} episode={tvShow.episode_name} poster={tvShow.episode_poster}
                                              description={tvShow.description_alt ? tvShow.description_alt : tvShow.description }
                                              episode_url={tvShow.episode_url} season={tvShow.season} episode_num={tvShow.episode_num} sizeWidth={200}/>
                            </div>
                        )}
                 </div>
            <div className="display-3 loading-text" style={{paddingBottom: 150}}>{loading && 'Loading...'}</div>
            <div className="display-3 error-text">{error && 'Error'}</div>
        </div>
    )
}