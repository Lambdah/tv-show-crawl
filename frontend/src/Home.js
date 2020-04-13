/**
 * Page for /
 */

import React, {createRef} from 'react';
import axios from 'axios';
import EpisodeCard from './child/episodeCard';

export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            episodes: [],
            hasMore: false,
            loading: false,
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
        this.setState({loading: true, error: false});
        axios.get(`http://localhost:8018/episodes/new_releases/page/${this.state.pagination}/sizes/24`)
            .then(res => {
                const {data} = res;
                this.setState({episodes: [...new Set([...this.state.episodes, ...data])]});
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
            if (entries[0].isIntersecting && this.state.hasMore){
                this.setState({pagination: this.state.pagination + 1});
                this.setState({loading: true});
                setTimeout(this.episodePagination, 500);

            }
        });
        if (node) this.observer.current.observe(node);


    }



    render(){
        return(
            <div className="container">
                <div className="row">
                    <h2 className="col-0" style={{paddingTop: 100}}>New Releases</h2>
                </div>
                <div className="row paginate">
                    {this.state.episodes.map((tvShow, index) =>
                        <li className="card col-4 my-2 border-0" key={tvShow._id} ref={this.state.episodes.length === index + 1 ? this.lastEpisodeRef : null}>
                            <EpisodeCard title={tvShow.show} episode={tvShow.episode_name} poster={tvShow.episode_poster}
                                         description={tvShow.description_alt ? tvShow.description_alt : tvShow.description }
                                         episode_url={tvShow.episode_url} sizeWidth={300} season={tvShow.season} episode_num={tvShow.episode_num} />
                        </li>)}
                </div>
                <div className="display-3 loading-text" style={{paddingBottom: 100}}>{this.state.loading && 'Loading...'}</div>
                <div className="error-text">{this.state.error && 'Error'}</div>

            </div>
        )
    }
}