/**
 * Button for subscribing to a show in /show/:title
 */

import React from 'react';
import axios from "axios";
import auth0Client from "../Auth";

export default class SubscribeButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            didClick: false,
            isLoading: true,
            isSubscribed: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleCheckLogin = this.handleCheckLogin.bind(this);
    }

    componentDidMount() {
        setTimeout(this.handleCheckLogin, 1000);

    }

    componentWillUnmount() {
        if(auth0Client.isAuthenticated() && this.state.didClick){
            const tvShow = this.props.tvShow;
            const isSub = this.state.isSubscribed;
            axios.post(`${process.env.REACT_APP_SERVER}/users/subscribed`, {tvShow, isSub}, {
                headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
            }).catch(function(error){
                if(error.response){
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            })
        }
    }

    async handleCheckLogin(){
        if (auth0Client.isAuthenticated()){
            const {email} = auth0Client.getProfile();
            const subscribedShows = await axios.post(`${process.env.REACT_APP_SERVER}/users`, {email}, {
                headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
            });

            const subbedShows = subscribedShows.data.map(epi => {
               return epi.title;
            });
            this.setState({isSubscribed: subbedShows.includes(this.props.tvShow), isLoading: false});
        }
    }

    handleClick(){
        this.setState({isSubscribed: !this.state.isSubscribed, didClick: true});
    }

    render(){
        if(!auth0Client.isAuthenticated() || this.state.isLoading){
            return (
            <button type="button" className="btn btn-secondary btn-lg" disabled>Subscribe</button>
            )
        }
        return(
            <button type="button" className="btn btn-success btn-lg" onClick={this.handleClick}>{this.state.isSubscribed ? "Unsubscribe" : "Subscribe" }</button>
        )
    }
}