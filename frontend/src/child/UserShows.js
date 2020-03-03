import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import auth0Client from "../Auth";

class UserShows extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscribedShows: []
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
            <div className="container">
                <h2>You are logged in</h2>
            </div>
        )
    }
}

export default withRouter(UserShows);