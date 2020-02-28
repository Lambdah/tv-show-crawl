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

    componentDidMount() {
        if (auth0Client.isAuthenticated()){
            const email = auth0Client.getProfile().email;
            axios.post(`http://localhost:8018/users`, {email}, {
                headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
            }).then(function(res){
                const {subscribedShows} = res.data;
                if(subscribedShows){
                    this.setState({subscribedShows});
                }
            });
            this.props.history.push('/');
        }
    }

    render(){
        if (!auth0Client.isAuthenticated()) return null;
        return (
            <h2>You are logged in</h2>

        )
    }
}

export default withRouter(UserShows);