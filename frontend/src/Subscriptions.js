import React from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from "./Auth";
import axios from 'axios';
import styled from "styled-components";
import UserShows from "./child/UserShows";
import Sidebar from "./child/Sidebar";

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

const Vertical = styled.div`
    
    .position-fixed{
        border-left: 1px solid rgba(0,0,0,0.1);
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
                <div className="row py-2">
                    {/*<div className="col-1 order-2 pl-5 ml-5 py-5 d-flex bd-sidebar" id="sticky-sidebar">*/}
                    {/*    <Vertical>*/}
                    {/*        <div className="position-fixed text-center px-4">*/}
                    {/*            <div className="sidebar-header">*/}
                    {/*                <h4>Subscriptions</h4>*/}
                    {/*            </div>*/}
                    {/*            <ul className="list-unstyled components">*/}
                    {/*                {this.state.subList.map((tv, index) =>*/}
                    {/*                    <li key={index}>*/}
                    {/*                        {tv.title}*/}
                    {/*                    </li>*/}
                    {/*                )}*/}
                    {/*            </ul>*/}
                    {/*        </div>*/}
                    {/*    </Vertical>*/}
                    {/*</div>*/}
                    <Sidebar subscription={this.state.subList}/>
                    <div className="col" id="main">
                        <div className="row text-right display-3 mt-4">Your Shows</div>
                        {this.state.subList.map((tv,index) =>
                            <Jumbotron key={index} className="jumbotron">
                                <UserShows title={tv.title} />
                            </Jumbotron>
                        )}
                    </div>

                </div>


            </Container>
        )
    }
}

export default withRouter(Subscriptions);