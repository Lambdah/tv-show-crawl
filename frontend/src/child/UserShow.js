import React, {Component} from 'react';
import styled from "styled-components";
import axios from 'axios';


class UserShow extends Component{
    constructor(props) {
        super(props);
        this.state = {
            subscription: [],
            episodes: [],
            isLoaded: false
        };
    }

    async componentDidMount() {
        const episodeArr = [];
        const subscription = this.props.subscription;
        for(let i=0; i < subscription.length; i++){
            const {data} = await axios.get(`http://localhost:8018/episodes/tv/${subscription[i].title}`);
            episodeArr.push(data);
        }
        const flatEpisode = episodeArr.flat();
        this.setState({episodes: flatEpisode, isLoaded: true});
    }


    render(){

        if (!this.state.isLoaded){
            return (<p>Loading ...</p>)
        }
        const episodes = this.state.episodes;
        const new_releaseEpi = episodes.filter(epi => {
            return epi.new_release === true
        });
        console.log(new_releaseEpi);
        return(
          <div>
              Done loading
              <ul>
                  {episodes.map((epi) =>
                  <li key={epi._id}>
                      {epi.episode_name}
                  </li>
                  )}
              </ul>

          </div>
        );
    }
}

export default UserShow;