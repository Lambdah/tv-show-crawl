import React from 'react';
import axios from 'axios';
import EpisodeCard from "./episodeCard";

export default class SubscriptionCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            episodes: []
        }
    }

    async componentDidMount() {
        const {data} = await axios.get(`${process.env.REACT_APP_SERVER}/episodes/tv/new/listed/${this.props.tvShow}`);
        this.setState({episodes: data});
    }

    render(){
        return(
            <div className="row">
                {this.state.episodes.map(episode =>
                    <div key={episode._id} className="card col-3">
                    <EpisodeCard title={episode.show} episode={episode.title} poster={episode.poster}
                                 description={episode.description_alt ? episode.description_alt : episode.description }
                                 episode_url={episode.link} sizeWidth={200}/>
                    </div>
                )}
            </div>
        )
    }

}