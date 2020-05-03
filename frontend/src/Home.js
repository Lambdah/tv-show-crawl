/**
 * Page for /
 */

import React, {createRef} from 'react';
import axios from 'axios';
import styled from "styled-components";

const TelevisionSet = styled.div`
    * {
        position: relative;
        text-align: center;
        color: black;
    }
    
    img {
        padding-top: 10%;
        z-index: 0;
    }
    
    #carouselShows{
        position: absolute;
        top:220px;
        left: 550px;
        max-width: 500px;
        z-index: -1;
    }
`

const NetworkBand = styled.div`
    background-color: ${props => props.bgColor};
    
    .text-stats{
        color: ${props => props.textColor};
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
                    <img src={require('./img/televisionSet.png')} alt="Television"/>
                    <div id="carouselShows" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <p className="display-3">Welcome to</p>
                                    <div className="d-block w-100 display-2">TV Poop Shoot</div>
                                </div>
                                <div className="carousel-item">
                                    <div className="d-block">
                                        <p className="display-4">Watch Canadian Networks:</p>
                                        <p className="display-4">CBC, CityTV, CTV, Global, and MUCH</p>
                                    </div>

                                </div>
                                <div className="carousel-item">
                                    <div className="d-block display-4"><p>Stay up-to-date with the latest Canadian shows that can be watched online</p></div>
                                </div>
                            </div>
                    </div>
                </TelevisionSet>

                <div className="d-flex flex-column mx-5 px-5 " style={{backgroundColor: 'rgba(86,61,124,.15)', border: '1px solid rgba(86,61,124,.15)'}}>
                    <div className="d-flex flex-row mx-5 px-2">
                        <div className="p-2" style={{backgroundColor: '#ffffff', width: '9%'}}></div>
                        <div className="p-2" style={{backgroundColor: '#f9fb00', width: '9%'}}></div>
                        <div className="p-2" style={{backgroundColor: '#02feff', width: '9%'}}></div>
                        <div className="p-2" style={{backgroundColor: '#01ff00', width: '9%'}}></div>
                        <div className="p-2" style={{backgroundColor: '#fd00fb', width: '9%'}}></div>
                        <div className="p-2" style={{backgroundColor: '#fb0102', width: '9%'}}></div>
                        <div className="p-2" style={{backgroundColor: '#0301fc', width: '9%'}}></div>
                        <div className="p-2" style={{backgroundColor: '#000000', width: '9%'}}></div>
                    </div>
                    <div className="p-2" style={{border: '1px solid rgba(86,61,124,.15)'}}>Flex item 2</div>
                    <div className="p-2" style={{border: '1px solid rgba(86,61,124,.15)'}}>Flex item 3</div>
                </div>

                <div className="row">
                    <div className="display-4 p-4">TV Poop helps you navigate Free Episodes that are available from their respective Network</div>
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