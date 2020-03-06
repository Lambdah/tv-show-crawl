import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import auth0Client from "../Auth";
import SubscriptionCard from "./subscriptionCard";

class UserShows extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscribedShows: [],
            numOfShows: 20
        };

    }

    async componentDidMount() {
        if (auth0Client.isAuthenticated()){
            const {email} = auth0Client.getProfile();
            const {data} = await axios.post(`http://localhost:8018/users`, {email}, {
                headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
            });
            const subscribedShows = [];
            for (let i=0; i < data.length; i++){
                subscribedShows.push(data[i].title);
            }
            this.setState({subscribedShows});
        }
    }



    render(){
        if (!auth0Client.isAuthenticated()) return null;
        return (
            <div>
                <div className="display-4 row text-left">Your Shows</div>
                {this.state.subscribedShows.map((tvShow, index) =>
                <div key={new Date().getTime() * index}>
                    <div className="display-5 row">{tvShow}</div>
                    <SubscriptionCard tvShow={tvShow}/>
                </div>
                )}
            </div>
        )
    }
}

export default withRouter(UserShows);