import React, {Component} from 'react';
import styled from "styled-components";
import EpisodeCard from "./episodeCard";
import auth0Client from "../Auth";
import axios from "axios";

const Horizontal = styled.hr`
    width: 110%;
    margin-right: 15%;
    color: #000000;
`;

class UserShow extends Component{
    constructor(props) {
        super(props);
        this.state = {
            today: [],
            week: [],
            month: [],
            older: [],
            episodes: [],
            hasMore: true,
            pagination: 0,
            loading: true,
            error: false
        };
        this.observer = React.createRef();
        this.episodePagination = this.episodePagination.bind(this);
        this.lastEpisodeRef = this.lastEpisodeRef.bind(this);
        this.episodeTimeSplit = this.episodeTimeSplit.bind(this);
        this._isMount = false;
    }

    async componentDidMount() {
        this._isMount = true;
        this.episodePagination();
    }

    componentWillUnmount() {
        this._isMount = false;
    }

    episodePagination(){
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        this.setState({loading: true, error: false});
        const {email} = auth0Client.getProfile();
        axios.post(`http://localhost:8018/users/shows/${this.state.pagination}`, {email}, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`,
            cancelToken: source.token
            }
            })
            .then((res) => {
                const {data} = res;
                this.setState({hasMore: data.length > 0});
                this.setState({episodes: [...this.state.episodes, ...data], loading: false});
                if(this._isMount){
                    setTimeout(() => this.episodeTimeSplit(), 500);
                }
            }).catch(e => {
                if(axios.isCancel(e)){
                    source.cancel();
                    return ;
                }
                this.setState({error: true});



        });
    }

    episodeTimeSplit(){
        const rightNow = new Date().getTime();
        const today = this.state.episodes.filter(epi => {
            return Math.abs(Date.parse(epi.date) - rightNow) < 84600000;
        });
        const week = this.state.episodes.filter(epi => {
            const timeDiff = Math.abs(Date.parse(epi.date) - rightNow);
            return timeDiff > 84600000 && timeDiff < 604800000;
        });
        const month = this.state.episodes.filter(epi => {
            const timeDiff = Math.abs(Date.parse(epi.date) - rightNow);
            return timeDiff > 604800000 && timeDiff < 2592000000;
        });
        const older = this.state.episodes.filter(epi => {
            const timeDiff = Math.abs(Date.parse(epi.date) - rightNow);
            return timeDiff > 2592000000;
        });
        this.setState({today, week, month, older});
    }

    lastEpisodeRef(node){

        if(this.state.loading) return ;
        if(this.observer.current){
            this.observer.current.disconnect();
        }

        this.observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && this.state.hasMore){
                this.setState({pagination: this.state.pagination + 1});
                this.episodePagination();
            }
        });
        if (node) this.observer.current.observe(node);
    }



    render(){
        return(
            <div className="container">
                {this.state.today.length > 0 ?
                    <div>
                        <h5 className="my-4 row">Today</h5>
                        <ul className="row">
                            {this.state.today.map((tvShow, index) => {
                                return(
                                    <div className="col-4" key={tvShow._id} ref={this.state.episodes.length === index + 1 ? this.lastEpisodeRef : null}>
                                        <EpisodeCard title={tvShow.show} episode={tvShow.title} poster={tvShow.poster}
                                                     description={tvShow.description_alt ? tvShow.description_alt : tvShow.description }
                                                     episode_url={tvShow.link} sizeWidth={240} season={tvShow.season} episode_num={tvShow.episode} />
                                    </div>
                                );
                            })}
                        </ul>
                        <Horizontal/>
                    </div>
                    :
                    <div> </div> }
                {this.state.week.length > 0 ?
                    <div>
                        <h5 className="my-4 row">This Week</h5>
                        <ul className="row">
                        {this.state.week.map((tvShow, index) => {
                            return(
                                <div className="col-4" key={tvShow._id} ref={this.state.episodes.length === this.state.today.length + index + 1 ? this.lastEpisodeRef : null}>
                                    <EpisodeCard title={tvShow.show} episode={tvShow.title} poster={tvShow.poster}
                                                 description={tvShow.description_alt ? tvShow.description_alt : tvShow.description }
                                                 episode_url={tvShow.link} sizeWidth={240} season={tvShow.season} episode_num={tvShow.episode} />
                                </div>
                            );
                        })}
                        </ul>
                        <Horizontal/>
                    </div>
                    :
                    <div> </div> }
                {this.state.month.length > 0 ?
                    <div>
                        <h5 className="my-4 row">This Month</h5>
                        <ul className="row">
                            {this.state.month.map((tvShow, index) => {
                                return(
                                    <div className="col-4" key={tvShow._id} ref={this.state.episodes.length === this.state.week.length + this.state.today.length + index + 1 ? this.lastEpisodeRef : null}>
                                        <EpisodeCard title={tvShow.show} episode={tvShow.title} poster={tvShow.poster}
                                                     description={tvShow.description_alt ? tvShow.description_alt : tvShow.description }
                                                     episode_url={tvShow.link} sizeWidth={240} season={tvShow.season} episode_num={tvShow.episode} />
                                    </div>
                                );
                            })}
                        </ul>
                        <Horizontal/>
                    </div>
                    :
                    <div> </div>
                    }
                {this.state.older.length > 0 ?
                    <div>
                        <h5 className="my-4 row">Older</h5>
                        <ul className="row">
                            {this.state.older.map(tvShow => {
                                return(
                                    <div className="col-4" key={tvShow._id}>
                                        <EpisodeCard title={tvShow.show} episode={tvShow.title} poster={tvShow.poster}
                                                     description={tvShow.description_alt ? tvShow.description_alt : tvShow.description }
                                                     episode_url={tvShow.link} sizeWidth={240} season={tvShow.season} episode_num={tvShow.episode} />
                                    </div>
                                );
                            })}
                        </ul>
                        <Horizontal/>
                    </div>
                    :
                    <div> </div>
                }
                <div className="display-2 loading-text">{this.state.loading && 'Loading...'}</div>
                <div className="display-2 error-text">{this.state.error && 'Error...'}</div>
            </div>
        )
    }
}

export default UserShow;