/**
 * Page for /subscriptions
 */

import React from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from "./Auth";
import axios from 'axios';
import styled from "styled-components";
import Sidebar from "./child/Sidebar";
import UserShow from "./child/UserShow";

const Container = styled.div`
    
`;

class Subscriptions extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            subList: [],
            isSubLoaded: false,
            error: false,
            textLoading: ''
        };
        this.handleUserCall = this.handleUserCall.bind(this);
        this._isMounted = false;
    }

    componentDidMount(){
        this._isMounted = true;
        setTimeout(this.handleUserCall, 500);
        if (this._isMounted){
            setTimeout(() => this.setState({textLoading: 'Subscribe to shows through Network'}), 1000);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async handleUserCall(){
        const {email} = auth0Client.getProfile();
        await axios.post(`http://localhost:8018/users`, {email}, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
        })
            .then((res) =>{
                const {data} = res;
                this.setState({subList: data, isSubLoaded: true});
            });
    }

    render(){
        if (this.state.subList.length === 0) return(
          <Container className="container" style={{paddingTop: 100}}>
              <div className="row text-left display-4 mt-4">{this.state.textLoading}</div>
          </Container>
        );
        return(
            <Container className="container">
                <div className="row py-2">
                    {this.state.isSubLoaded ? <Sidebar subscription={this.state.subList}/> : <p>Loading</p>}
                    <div className="col" id="main">
                        <div className="row text-right display-4">Your Shows</div>
                        <UserShow />
                    </div>

                </div>


            </Container>
        )
    }
}

export default withRouter(Subscriptions);