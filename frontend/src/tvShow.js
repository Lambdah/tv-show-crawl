import React from 'react';
// import {useParams} from 'react-router-dom';
import {withRouter} from 'react-router';
import axios from 'axios';


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
                        <div className="col-4">
                            <img src={this.state.tvShow.poster} className="rounded float-left" alt="poster" />
                        </div>
                        <div className="col-8">
                            <h1 className="display-4 text-left">{this.state.title}</h1>
                            <hr className="my-0" />
                            <p className="lead my-5 text-left">{this.state.tvShow.synopsis}</p>
                        </div>
                    </div> {/* row */}

                </div> {/* jumbotron */}
                <h1 className="display-5 text-left">Episodes</h1>
                <div className="row">
                    {this.state.episodes.length === 0 ? <p>Seems like it is empty down here...</p> : <p></p>}
                    {this.state.episodes.map(epi =>
                        <div className="card col-12 border-0">
                            <div className="card-body row">
                                <div className="col-6">
                                    <img src={epi.episode_poster} className="rounded float-left" alt="epi poster" />

                                </div> {/* card-image */}
                                <div className="col-6">
                                    <h5 className="card-title">{epi.episode_name} (S{epi.season}E{epi.episode_num})</h5>
                                    <p className="card-text my-3 text-center">{epi.description_alt ? epi.description_alt : epi.description}</p>
                                </div>{/* card-info */}
                                <a href={epi.episode_url} className="stretched-link" aria-label={epi.episode_name} aria-hidden="true" name="Watch Episode"/>
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