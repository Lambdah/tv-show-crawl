import React from 'react';
import axios from "axios";
import auth0Client from "../Auth";
import dev from "../config/dev";

export default class SubscribeButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            subscribedShows: [],
            didClick: false,
            isLoading: true
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
            axios.post(`${dev.Server}/users/subscribed`, {tvShow}, {
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
            const email = auth0Client.getProfile().email;
            const subscribedShows = await axios.post(`http://localhost:8018/users`, {email}, {
                headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
            });
            let subbedShows = [];
            for (let i=0; i < subscribedShows.data.length; i++){
                subbedShows.push(subscribedShows.data[i].title);
            }
            this.setState({subscribedShows: subbedShows});
            this.setState({isLoading: false});
        }
    }

    handleClick(){
        let subList = this.state.subscribedShows;
        (subList.includes(this.props.tvShow) ?
            subList = subList.filter(show => show !== this.props.tvShow) : subList.push(this.props.tvShow));
        this.setState({subscribedShows: subList});
        this.setState({didClick: true});
    }

    render(){
        if(!auth0Client.isAuthenticated() || this.state.isLoading){
            return (
            <button type="button" className="btn btn-secondary btn-lg" disabled>Subscribe</button>
            )
        }
        let subscribed = this.state.subscribedShows.includes(this.props.tvShow);
        return(
            <button type="button" className="btn btn-success btn-lg" onClick={this.handleClick}>{subscribed ? "Unsubscribe" : "Subscribe" }</button>
        )
    }
}