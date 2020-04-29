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
        this.setState(prevState => {
            const filtered = prevState.episodes.filter(epi => {
                let epiDesc = epi.description_alt ? epi.description_alt : epi.description;
                return epi.show.toLowerCase().includes(search.toLowerCase()) || epiDesc.toLowerCase().includes(search.toLowerCase());
            });
            return {
                search,
                filtered
            };
        });
    }

    componentDidMount() {
        const search = this.props.match.params.search;
        this.setState({search: search});
        axios.get(`http://localhost:8018/episodes/`)
            .then(res => {
                const episodes = res.data;
                const filtered = episodes.filter(epi => {
                    let epiDesc = epi.description_alt ? epi.description_alt : epi.description;
                    return epi.show.toLowerCase().includes(search.toLowerCase()) || epiDesc.toLowerCase().includes(search.toLowerCase());
                });
                this.setState({episodes, filtered});
            });
    }

    render(){
        return(
            <div className="container">
                <div className="display-3 text-left">Find the right poop search...</div>
                <form>
                    <input className="form-control my-5" type="search" placeholder="Search" aria-label="Search" value={this.state.search} onChange={this.handleChange}/>
                </form>
                <div className="display-4 text-left">Results</div>
                <div className="row">
                    {this.state.filtered.map(tvShow =>
                        <div className="card col-4" key={tvShow._id}>
                            <EpisodeCard title={tvShow.show} episode={tvShow.title} poster={tvShow.poster}
                                         description={tvShow.description_alt ? tvShow.description_alt : tvShow.description }
                                         episode_url={tvShow.link} sizeWidth={300}/>
                        </div>)}
                </div>{/* row */}
            </div>

        )
    }


}