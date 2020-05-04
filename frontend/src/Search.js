import React from 'react';
import axios from 'axios';
import EpisodeCard from './child/episodeCard';

export default class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            episodes: [],
            filtered: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(){
        const {search} = this.state;
        const filtered = this.state.episodes.filter(episode => {
            return episode.show.toLowerCase().includes(search.toLowerCase());
        });
        this.setState(filtered);
    }

    handleChange(event){
        const search = event.target.value;
        if (search.trim().length > 3){
            this.setState(prevState => {
                const filtered = prevState.episodes.filter(epi => {
                    return epi.show.toLowerCase().includes(search.trim().toLowerCase());
                });
                return {
                    search,
                    filtered
                };
            });
        }else{
            this.setState({filtered: [], search: search});
        }

    }

    componentDidMount() {
        const search = this.props.match.params.search;
        this.setState({search: search});
        axios.get(`http://localhost:8018/episodes/`)
            .then(res => {
                const episodes = res.data;
                if (search.trim().length > 3){
                    const filtered = episodes.filter(epi => {
                        return epi.show.toLowerCase().includes(search.trim().toLowerCase());
                    });
                    this.setState({episodes, filtered});
                } else {
                    this.setState({filtered: [], search: search});
                }
            });
    }

    render(){
        return(
            <div className="container">
                <div className="display-3 text-left" style={{paddingTop: '100px'}}>Find the right poop search...</div>
                <form>
                    <input className="form-control my-5" type="search" placeholder="Use this search bar!" aria-label="Search" value={this.state.search} onChange={this.handleChange}/>
                </form>
                <div className="display-3 text-left">Results</div>
                <div className="row">
                    {this.state.filtered.length === 0 ?
                        <div className="display-4 text-info mx-3">No Results Yet</div>
                        :
                        <span></span>
                    }

                    {this.state.filtered.map(tvShow =>
                        <div className="card col-4" key={tvShow._id}>
                            <EpisodeCard title={tvShow.show} season={tvShow.season} episode={tvShow.episode} poster={tvShow.poster}
                                         description={tvShow.description_alt ? tvShow.description_alt : tvShow.description }
                                         episode_url={tvShow.link} sizeWidth={300}/>
                        </div>)}
                </div>{/* row */}
            </div>

        )
    }


}