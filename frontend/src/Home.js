/**
 * Page for /
 */

import React, {createRef} from 'react';
import axios from 'axios';
import styled from "styled-components";

const TelevisionSet = styled.div`
    .container {
        padding-top: 10%;
        position: relative;
        text-align: center;
        color: black;
    }
    
    img {
        z-index: 0;
    }
    
    @media screen and (min-width: 951px){
        #carouselShows{
            position: absolute;
            top: 30%;
            left: 17%;
            max-width: 500px;
            min-width: 500px;
            z-index: -1;
            background-color: blue;
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
            background-color: pink;
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
            left: 16%;
            max-width: 160px;
            min-width:160px;
            z-index: -1;
            background-color: green;
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
            citytv: {}
        };
        this.observer = createRef();
    }

    componentDidMount() {
        axios.get('http://localhost:8018/networks/stats')
            .then((network) => {
                const networkStats = network.data;
                networkStats.forEach((stats) => {
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

            })
    }


    render(){
        return(
            <>
            <div className="container">
                <TelevisionSet>
                    <div className="container">

                        <img src={require('./img/television-set-960w.png')} srcSet={`${require('./img/television-set-960w.png')} 960w,
                        ${require('./img/televsion-set-672w.png')} 672w, 
                        ${require('./img/televsion-set-480w.png')} 480px`} sizes="(max-width: 600px) 480px, (max-width: 950px) 672px, 960px" alt="Television"/>
                        <div id="carouselShows" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="d-block w-100">
                                        <p className="">Welcome to</p>
                                        <p className="">TV Poop Shoot</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="d-block w-100">
                                        <p className="">Watch Canadian Networks:</p>
                                        <p className="">CBC, CityTV, CTV, Global, and MUCH</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="d-block w-100">
                                        <p>Keep track of the latest Canadian shows that can be watched online</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </TelevisionSet>

                <div className="row">
                    <DescriptionText>
                        <div id="info-site" className="display-4 p-4">TV Poop helps you navigate Free Episodes that are available from their respective Network</div>
                    </DescriptionText>
                </div>

            </div>
            <NetworkBand id="muchNetwork" className="container-fluid mt-4" bgColor="#000000" textColor="#ffffff">
                <div className="container">
                    <div className="text-stats display-4 ml-3 text-left">MUCH has...</div>
                    <div className="text-stats display-4 text-center">{this.state.much.showCount} Shows</div>
                    <div className="text-stats display-4 text-right">and {this.state.much.episodeCount} Episodes</div>
                </div>
            </NetworkBand>

            <NetworkBand className="container-fluid" bgColor="#0301fc" textColor="#f9fb00" >
                <div className="container">
                    <div className="text-stats display-4 ml-3 text-right">CityTV has...</div>
                    <div className="text-stats display-4 text-center">{this.state.citytv.showCount} Shows</div>
                    <div className="text-stats display-4 text-left">and {this.state.citytv.episodeCount} Episodes</div>
                </div>
            </NetworkBand>

                <NetworkBand className="container-fluid" bgColor="#fb0102" textColor="#02feff">
                    <div className="container">
                        <div className="text-stats display-4 text-left">CBC has...</div>
                        <div className="text-stats display-4 text-center">{this.state.cbc.showCount} Shows</div>
                        <div className="text-stats display-4 text-right">and {this.state.cbc.episodeCount} Episodes</div>
                    </div>
                </NetworkBand>

                <NetworkBand className="container-fluid" bgColor="#fd00fb" textColor="#01ff00">
                    <div className="container">
                        <div className="text-stats display-4 ml-3 text-right">Global has...</div>
                        <div className="text-stats display-4 text-center">{this.state.global.showCount} Shows</div>
                        <div className="text-stats display-4 text-left">and {this.state.global.episodeCount} Episodes</div>
                    </div>
                </NetworkBand>

                <NetworkBand className="container-fluid" bgColor="#01ff00" textColor="#fd00fb" >
                    <div className="container">
                        <div className="text-stats display-4 ml-3 text-left">CTV has...</div>
                        <div className="text-stats display-4 text-center">{this.state.ctv.showCount} Shows</div>
                        <div className="text-stats display-4 text-right">and {this.state.ctv.episodeCount} Episodes</div>
                    </div>
                </NetworkBand>


            </>
        )
    }
}