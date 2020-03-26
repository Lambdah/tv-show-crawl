import React from 'react';
import axios from "axios";
import EpisodeCard from './child/episodeCard';

export default class NewRelease extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            newReleases: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8018/episodes/new_releases`)
            .then(res => {
                const newReleases = res.data;
                this.setState({newReleases});
            })
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <h3 className="col-0">New Release</h3>
                </div>
                <div className="row">
                        {this.state.newReleases.map(tvShow =>
                            <div className="card col-3">
                                <EpisodeCard title={tvShow.show} episode={tvShow.episode_name} poster={tvShow.episode_poster}
                                             description={tvShow.description_alt ? tvShow.description_alt : tvShow.description }
                                             episode_url={tvShow.episode_url} sizeWidth={200}/>
                            </div>
                        )}
                </div>

            </div>
        )
    }
}