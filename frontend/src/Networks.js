/**
 * Page for /networks
 */
import React from 'react';
import axios from 'axios';
import styled from "styled-components";
import NoPosterImg from "./child/NoPosterImg";

const PosterShow = styled.div`
    .poster-class{
        height: auto;
        width: auto;
        padding-right:2em;
        background-color: lightgrey;
        min-height: 93.5%;
        min-width: 20.5em;
        }
        
    img{
       display: block;
       margin: auto;
       padding: 3em 0em 2em 0em;
    }
     
`;

export default class Networks extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            networks: ["citytv", "much", "CBC"],
            tvShows: []
        };
        this.filterNetworks = this.filterNetworks.bind(this);
        this.handleUrl = this.handleUrl.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8018/networks/')
            .then(res =>{
                const tvShows = res.data;
                this.setState({tvShows});
            });
    }

    filterNetworks(network){
        return this.state.tvShows.filter(show => {
            return show.network === network;
        });
    }

    handleUrl(url){
        return `http://localhost:3000/show/${url}`
    }

    render(){
        return (
            <div className="container">
                <h1 className="display-4 text-left">Networks</h1>
                {this.state.networks.map(network =>
                    <div>
                        <h3 className="display-5 text-left">{network}</h3>
                        <div className="row">
                            {this.filterNetworks(network).map(tvShow =>
                                <PosterShow>
                                <div className="col-4 my-3 poster-class rounded border border-primary">

                                    {tvShow.poster !== "N/A" ?
                                        <img src={tvShow.poster} alt={tvShow.tvTitle} className="rounded"/>
                                    :
                                        <NoPosterImg tvTitle={tvShow.tvTitle}/>
                                    }

                                        <a className="stretched-link" href={this.handleUrl(tvShow.tvTitle)} aria-hidden={true} />
                                </div>
                                </PosterShow>
                            )}
                        </div>

                    </div>
                )}
            </div>
        )
    }
}