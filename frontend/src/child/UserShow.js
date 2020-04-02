import React, {Component} from 'react';
import styled from "styled-components";
import EpisodeCard from "./episodeCard";

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
            older: []
        };
        // this.episodeBox = this.episodeBox.bind(this);

    }

    async componentDidMount() {
        const rightNow = new Date().getTime();
        const today = this.props.subscription.filter(epi => {
            return Math.abs(Date.parse(epi.date) - rightNow) < 84600000;
        });
        const week = this.props.subscription.filter(epi => {
            const timeDiff = Math.abs(Date.parse(epi.date) - rightNow);
            return timeDiff > 84600000 && timeDiff < 604800000;
        });
        const month = this.props.subscription.filter(epi => {
            const timeDiff = Math.abs(Date.parse(epi.date) - rightNow);
            return timeDiff > 604800000 && timeDiff < 2592000000;
        });
        const older = this.props.subscription.filter(epi => {
            const timeDiff = Math.abs(Date.parse(epi.date) - rightNow);
            return timeDiff > 2592000000;
        });
        this.setState({today, week, month, older});
    }



    render(){
        return(
            <div className="container">
                {this.state.today.length > 0 ?
                    <div>
                        <h5 className="my-4 row">Today</h5>
                        <ul className="row">
                            {this.state.today.map(tvShow => {
                                return(
                                    <div className="col-4" key={tvShow._id}>
                                        <EpisodeCard title={tvShow.show} episode={tvShow.episode_name} poster={tvShow.episode_poster}
                                                     description={tvShow.description_alt ? tvShow.description_alt : tvShow.description }
                                                     episode_url={tvShow.episode_url} sizeWidth={240} season={tvShow.season} episode_num={tvShow.episode_num} />
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
                        {this.state.week.map(tvShow => {
                            return(
                                <div className="col-4" key={tvShow._id}>
                                    <EpisodeCard title={tvShow.show} episode={tvShow.episode_name} poster={tvShow.episode_poster}
                                                 description={tvShow.description_alt ? tvShow.description_alt : tvShow.description }
                                                 episode_url={tvShow.episode_url} sizeWidth={240} season={tvShow.season} episode_num={tvShow.episode_num} />
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
                            {this.state.month.map(tvShow => {
                                return(
                                    <div className="col-4" key={tvShow._id}>
                                        <EpisodeCard title={tvShow.show} episode={tvShow.episode_name} poster={tvShow.episode_poster}
                                                     description={tvShow.description_alt ? tvShow.description_alt : tvShow.description }
                                                     episode_url={tvShow.episode_url} sizeWidth={240} season={tvShow.season} episode_num={tvShow.episode_num} />
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
                                        <EpisodeCard title={tvShow.show} episode={tvShow.episode_name} poster={tvShow.episode_poster}
                                                     description={tvShow.description_alt ? tvShow.description_alt : tvShow.description }
                                                     episode_url={tvShow.episode_url} sizeWidth={240} season={tvShow.season} episode_num={tvShow.episode_num} />
                                    </div>
                                );
                            })}
                        </ul>
                        <Horizontal/>
                    </div>
                    :
                    <div> </div>
                }
            </div>
        )
    }
}

export default UserShow;