import React from 'react';
import axios from "axios";
import auth0Client from "../Auth";
import dev from "../config/dev";

export default class SubscribeButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            subscribedShows: []
        }
    }

    componentDidMount() {
        if (auth0Client.isAuthenticated()){
            axios.get(`${dev.Server}/users/subscribed`, {
                headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
            }).then(function(res){
                const {subscribedShows} = res.data;
                if(subscribedShows){
                    this.setState({subscribedShows});
                }
            });
        }
    }

    render(){
        if(!auth0Client.isAuthenticated()){
            return (
            <button type="button" class="btn btn-secondary btn-lg" disabled>Subscribe</button>
            )
        }
        let subscribed = this.state.subscribedShows.includes(this.props.tvShow);
        return(
            <button type="button" class="btn btn-success btn-lg">{subscribed ? "Unsubscribe" : "Subscribe" }</button>
        )
    }
}