import React from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from "./Auth";
import axios from 'axios';
import styled from "styled-components";
import UserShows from "./child/UserShows";

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
            subList: []
        }
    }

    async componentDidMount(){
        const {email} = auth0Client.getProfile();
        const {data} = await axios.post(`http://localhost:8018/users`, {email}, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
        });
        this.setState({subList: data});
    }

    render(){
        if (this.state.subList === []) return(
          <Container className="container">
              <div className="row text-left display-4 mt-4">Subscribe to shows through Network</div>
          </Container>
        );
        return(
            <Container className="container">
                <div className="row text-left display-3 mt-4">Your Shows</div>
                {this.state.subList.map((tv,index) =>
                    <Jumbotron key={index} className="jumbotron">
                        <UserShows title={tv.title} />
                    </Jumbotron>
                )}

            </Container>
        )
    }
}

export default withRouter(Subscriptions);