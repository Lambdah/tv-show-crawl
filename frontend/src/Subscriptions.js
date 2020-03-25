import React from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from "./Auth";
import axios from 'axios';
import styled from "styled-components";
import UserShows from "./child/UserShows";
import Sidebar from "./child/Sidebar";
import UserShow from "./child/UserShow";

const Container = styled.div`
    
`;

const Jumbotron = styled.div`
    background-color: darkslategray;
    opacity: 0.8;
    padding: 1em 3em 1em 3em; 
    margin: 1em;
    &:hover {
       opacity: 1;
    }
`;

class Subscriptions extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            subList: [],
            episodes: [],
            isLoaded: false
        }
    }

    async componentDidMount(){
        const {email} = auth0Client.getProfile();
        await axios.post(`http://localhost:8018/users`, {email}, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
        })
            .then((res) =>{
                const {data} = res;
                this.setState({subList: data, isLoaded: true});
            })

    }

    render(){
        if (this.state.subList.length === 0) return(
          <Container className="container">
              <div className="row text-left display-4 mt-4">Subscribe to shows through Network</div>
          </Container>
        );
        return(
            <Container className="container">
                <div className="row py-2">
                    <Sidebar subscription={this.state.subList}/>
                    <div className="col" id="main">
                        <div className="row text-right display-4">Your Shows</div>
                        {this.state.isLoaded ? <UserShow subscription={this.state.subList}/> : <p>Loading ...</p>}
                    </div>

                </div>


            </Container>
        )
    }
}

export default withRouter(Subscriptions);