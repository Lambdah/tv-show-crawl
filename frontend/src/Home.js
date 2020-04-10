/**
 * Page for /
 */

import React, {createRef, useCallback} from 'react';
import axios from 'axios';
import EpisodeCard from './child/episodeCard';

export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            episodes: [],
            hasMore: false,
            loading: true,
            pagination: 0,
            error: false
        };
        this.observer = createRef();
        this.episodePagination = this.episodePagination.bind(this);
        this.lastEpisodeRef = this.lastEpisodeRef.bind(this);
    }

    componentDidMount() {
        window.$('[data-toggle="tooltip"]').tooltip();
        this.episodePagination();
    }

    episodePagination(){
        this.setState({loading: true});
        this.setState({error: false});
        axios.get(`http://localhost:8018/episodes/new_releases/${this.state.pagination}`)
            .then(res => {
                const {data} = res;
                this.setState({episodes: [...this.state.episodes, ...data]});
                this.setState({hasMore: data.length > 0});
                this.setState({loading: false});
            }).catch(e => {
                this.setState({error: e});
            });
    }

    lastEpisodeRef(node){
        // if(this.state.loading) return ;
        if(this.observer.current){
            this.observer.current.disconnect();
        }

        this.observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting){
                // console.log("Last Node");
                this.setState({pagination: this.state.pagination + 1});
                setTimeout(this.episodePagination, 1000);

            }
        });
        if (node) this.observer.current.observe(node);

        // console.log(this.observer.current);

    }



    render(){
        return(
            <div className="container">
                <div className="row">
                    <h2 className="col-0">New Releases</h2>
                </div>
                <div className="row paginate">
                    {this.state.episodes.map((tvShow, index) =>
                        <li className="card col-4 my-2 border-0" key={tvShow._id} ref={this.state.episodes.length === index + 1 ? this.lastEpisodeRef : null}>
                            <EpisodeCard title={tvShow.show} episode={tvShow.episode_name} poster={tvShow.episode_poster}
                                         description={tvShow.description_alt ? tvShow.description_alt : tvShow.description }
                                         episode_url={tvShow.episode_url} sizeWidth={300} season={tvShow.season} episode_num={tvShow.episode_num} />
                        </li>)}
                </div>
                <div>{this.state.loading && 'Loading...'}</div>
                <div>{this.state.error && 'Error'}</div>

            </div>
        )
    }
}