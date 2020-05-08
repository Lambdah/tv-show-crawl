/**
 * Page for /
 */

import React from 'react';
import axios from 'axios';
import styled from "styled-components";
import {Link} from "react-router-dom";

const TelevisionSet = styled.div`
    .container {
        padding-top: 100px;
        position: relative;
        text-align: center;
        color: black;
    }
    
    img {
        z-index: 0;
        display: block;
        margin: 0 auto;
    }
    
    @media screen and (min-width: 951px){
        #carouselShows{
            position: absolute;
            top: 34%;
            left: 17%;
            max-width: 500px;
            min-width: 500px;
            z-index: -1;
        }
        
        .carousel-item p {
            font-size: 3vw;
        }
    }
    
    @media screen and (max-width: 950px){
        #carouselShows{
            position: absolute;
            top: 35%;
            left: 17%;
            max-width: 300px;
            min-width:300px;
            z-index: -1;
        }
        
        .carousel-item p {
            font-size: 3vw;
        }
    }
    
    @media screen and (max-width: 750px){
    
        .container {
            padding-top: 20%;
        }
        
        #carouselShows{
            position: absolute;
            top: 50%;
            left: 15%;
            max-width: 160px;
            min-width: 160px;
            z-index: -1;
        }
        
        img{
            width: 100%;
            height: auto;
        }
        .carousel-item p {
            font-size: 3vw;
        }
    }
`

const NetworkBand = styled.div`
    background-color: ${props => props.bgColor};
    
    .text-stats{
        color: ${props => props.textColor};
        
        // Large devices
        @media (min-width: 1199px){
            
        }
        
        // Medium devices
        @media (max-width: 991px){
            font-size: 3em;
        }
        
        // Small devices
        @media (max-width: 767px){
            font-size: 1.3em;
        }
    }
`

const DescriptionText = styled.div`
    
    // Large devices
    @media (min-width: 1199px){
        #info-site{
            
        }
    }
    
    // Medium devices
    @media (max-width: 991px){
        #info-site{
            font-size: 2em;
        }
    }
    
    // Small devices
    @media (max-width: 767px){
        #info-site{
            font-size: 1.4em;
        }
    }
`

export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            much: {},
            global: {},
            ctv: {},
            cbc: {},
            citytv: {},
            total: {},
            episodeCounter: 0,
            showCounter: 0,
            episodeId: {},
            showId: {},
            search: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8018/networks/stats')
            .then((network) => {
                const networkStats = network.data;
                let total = {episodeCount: 0, showCount: 0};
                networkStats.forEach((stats) => {
                    total = {episodeCount: total.episodeCount += stats.episodeCount, showCount: total.showCount += stats.showCount};
                    switch(stats.network){
                        case 'cbc':
                            this.setState({cbc: {episodeCount: stats.episodeCount, showCount: stats.showCount}});
                            break;
                        case 'citytv':
                            this.setState({citytv: {episodeCount: stats.episodeCount, showCount: stats.showCount}});
                            break;
                        case 'much':
                            this.setState({much: {episodeCount: stats.episodeCount, showCount: stats.showCount}});
                            break;
                        case 'global':
                            this.setState({global: {episodeCount: stats.episodeCount, showCount: stats.showCount}});
                            break;
                        case 'ctv':
                            this.setState({ctv: {episodeCount: stats.episodeCount, showCount: stats.showCount}});
                            break;
                        default:
                            break;
                    }
                })
                this.setState({total});
                const showId = setInterval(() => {
                        if (this.state.showCounter < this.state.total.showCount) {
                            this.setState({showCounter: this.state.showCounter + 1})
                        }
                    }, 10);
                this.setState({showId});
                const episodeId = setInterval(() => {
                    if (this.state.episodeCounter < this.state.total.episodeCount) {
                        this.setState({episodeCounter: this.state.episodeCounter + 1})
                    }
                }, 1);
                this.setState({episodeId});
            })
    }

    componentWillUnmount() {
        clearInterval(this.state.showId);
        clearInterval(this.state.episodeId);
    }

    handleChange(event){
        this.setState({search: event.target.value});
    }

    handleSubmit(){
        return '/search/' + this.state.search;
    }


    render(){
        return(
            <>
            <div className="container">
                <TelevisionSet>
                    <div className="container">
                        <img src={require('./img/television-set-960w.png')} srcSet={`${require('./img/television-set-960w.png')} 960w,
                        ${require('./img/televsion-set-672w.png')} 672w, 
                        ${require('./img/televsion-set-480w.png')} 480w`} sizes="(max-width: 600px) 480px, (max-width: 950px) 672px, 960px" alt="Television"
                        className="img-fluid" />
                        <div id="carouselShows" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="d-block w-100 mx-auto d-block">
                                        <p className="">Welcome to</p>
                                        <p className="">TV Poop Shoot</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="d-block w-100 mx-auto d-block">
                                        <p className="">Watch Canadian Networks:</p>
                                        <p className="">CBC, CityTV, CTV, Global, and MUCH</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="d-block w-100 mx-auto d-block">
                                        <p>Keep track of the latest Canadian shows that can be watched online</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </TelevisionSet>

                <div className="row">
                    <DescriptionText>
                        <div id="info-site" className="display-4 p-4">Search for some of your shows to watch!</div>
                    </DescriptionText>
                </div>

            </div>
            <NetworkBand className="container-fluid mt-0" bgColor="#000000" textColor="#ffffff">
                <div className="container">
                    <div style={{paddingTop: '1em'}}>&nbsp;</div>
                    <form className="form-inline my-1 justify-content-center" onSubmit={this.handleSubmit}>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search TV show title here"
                               aria-label="Search" onChange={this.handleChange}/>
                        <Link to={this.handleSubmit}>
                            <button className="btn btn-outline-light my-2 my-sm-0" type="Submit">Go!</button>
                        </Link>
                    </form>
                    <div className="row">
                        <h3 className="text-center my-4 text-white col-lg-4 col-md-12">
                            Number of Shows of <br/>{this.state.showCounter}
                        </h3>
                        <h3 className="text-center my-4 text-white col-lg-4 col-md-12">
                            Number of Episodes of <br/>{this.state.episodeCounter}
                        </h3>
                        <h3 className="text-center my-4 text-white col-lg-4 col-md-12">
                            Watch Episodes for <br/>free!
                        </h3>
                    </div>
                </div>
            </NetworkBand>
            </>
        )
    }
}