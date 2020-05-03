/**
 * Page for /show/:title
 */

import React from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';
import SubscribeButton from "./child/SubscribeButton";
import NoPosterImg from "./child/NoPosterImg";
import NoEpisodeImg from "./img/noEpisodeImage.svg";

class TvShow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            tvShow: {},
            episodes:[]
        }
    }

    componentDidMount() {
        const initTitle = this.props.match.params.title;
        const title = initTitle.replace(/(^\w|\s\w)/g, c=> c.toUpperCase());
        this.setState({title});
        axios.get(`http://localhost:8018/networks/title/${title}`)
            .then(res => {
                const tvShow = res.data;
                this.setState({tvShow});
            });
        axios.get(`http://localhost:8018/episodes/tv/${title}`)
            .then(res => {
                const episodes = res.data;
                this.setState({episodes});
            });
    }

    render(){
        return(
            <div className="container">
                <div className="jumbotron my-3">

                    <div className="row">

                            {this.state.tvShow ?
                            <>
                                <div className="col-4">
                                    {this.state.tvShow.poster !== "N/A" ?
                                        <img src={this.state.tvShow.poster} className="rounded float-left" alt="poster" />
                                        :
                                        <NoPosterImg title={this.state.title}/>
                                    }

                                </div>
                                <div className="col-8">
                                    <h1 className="display-4 text-left">{this.state.title}</h1>
                                <hr className="my-0" />
                                <p className="lead my-5 text-left">{this.state.tvShow.synopsis}</p>
                                <SubscribeButton tvShow={this.state.title} />
                                </div>
                            </>
                                :
                                <>
                                    <div className="col-4">
                                            <NoPosterImg tvTitle={this.state.title}/>
                                    </div>
                                    <div className="col-8">
                                        <h1 className="display-4 text-left">{this.state.title}</h1>
                                        <hr className="my-0" />
                                        <p className="lead my-5 text-left">Description seems to be missing</p>
                                        <SubscribeButton tvShow={this.state.title} />
                                    </div>
                                </>

                            }
                    </div> {/* row */}

                </div> {/* jumbotron */}
                <h1 className="display-5 text-left">Episodes</h1>
                <div className="row">
                    {this.state.episodes.length === 0 ? <p>Seems like it is empty down here...</p> : <p></p>}
                    {this.state.episodes.map(epi =>
                        <div className="card col-12 border-0" key={epi._id}>
                            <div className="card-body row">
                                <div className="col-6">
                                        <img src={epi.poster ? epi.poster : NoEpisodeImg} className="rounded float-left" alt="epi poster" style={{ maxHeight:197, maxWidth: 300}} />
                                </div> {/* card-image */}
                                <div className="col-6">
                                    <h5 className="card-title">{epi.title} (S{epi.season}E{epi.episode})</h5>
                                    <p className="card-text my-3 text-center">{epi.description_alt ? epi.description_alt : epi.description}</p>
                                </div>{/* card-info */}
                                <a href={epi.link} className="stretched-link" aria-label={epi.title} aria-hidden="true" name="Watch Episode" style={{fontSize: 0}}>Link to {epi.title}</a>
                            </div>{/* card-body */}
                            <hr className="my-4" />
                        </div>

                    )}
                </div>
            </div>
        )
    }
}

export default withRouter(TvShow);