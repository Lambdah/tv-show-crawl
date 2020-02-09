import React from 'react';
import axios from 'axios';
import EpisodeCard from './child/episodeCard';


export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tvShows: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8018/episodes/new_releases`)
            .then(res => {
                const tvShows = res.data;
                this.setState({tvShows});
            })
    }


    render(){
        return(
            <div className="container">
                <div className="row">
                    <h2 className="col-0">New Releases</h2>
                </div>
                <div className="row">
                    {this.state.tvShows.map(tvShow =>
                        <div className="card col-3">
                            <EpisodeCard title={tvShow.title} episode={tvShow.episode_name} poster={tvShow.episode_poster}
                                         description={tvShow.description_alt ? tvShow.description_alt : tvShow.description }
                                         episode_url={tvShow.episode_url} sizeWidth={200}/>
                        </div>)}
                </div>

            </div>
        )
    }
}