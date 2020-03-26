import React from 'react';
import axios from 'axios';
import EpisodeCard from './child/episodeCard';
import UserShows from './child/UserShows';



export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tvShows: [],
            ListedShows: []
        };
    }

    componentDidMount() {
        window.$('[data-toggle="tooltip"]').tooltip();
        axios.get(`http://localhost:8018/episodes/new_releases`)
            .then(res => {
                const tvShows = res.data;
                this.setState({tvShows});
            });

    }



    render(){
        return(
            <div className="container">
                <div className="row">
                    <h2 className="col-0">New Releases</h2>
                </div>
                <div className="row">
                    {this.state.tvShows.map(tvShow =>
                        <li className="card col-4 my-2 border-0" key={tvShow._id}>
                            <EpisodeCard title={tvShow.show} episode={tvShow.episode_name} poster={tvShow.episode_poster}
                                         description={tvShow.description_alt ? tvShow.description_alt : tvShow.description }
                                         episode_url={tvShow.episode_url} sizeWidth={300} season={tvShow.season} episode_num={tvShow.episode_num}/>
                        </li>)}
                </div>

            </div>
        )
    }
}