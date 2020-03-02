import React from 'react';
import './App.css';
import Header from './Header';
import {withRouter,BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Categories from './Categories';
import NewRelease from './newRelease';
import Home from './Home';
import Networks from './Networks';
import TvShow from "./tvShow";
import Search from "./Search";
import Callback from "./Callback";
import SecuredRoute from "./securedRoute/SecuredRoute";
import auth0Client from "./Auth";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            checkSession: true
        }
    }

    async componentDidMount(){
        if (this.props.location.pathname === '/callback') {
            this.setState({checkingSession: false});
            return;
        }
        try{
            await auth0Client.silentAuth();
            this.forceUpdate();
        } catch(err){
            if (err.error !== 'login_required') console.log(err.error);
        }
        this.setState({checkingSession: false});
    }

    render(){
        return(
        <div className="App">
            <Router>
                <Header />

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/categories">
                        <Categories />
                    </Route>
                    <Route exact path="/new_release">
                        <NewRelease />
                    </Route>
                    <Route exact path="/networks">
                        <Networks />
                    </Route>
                    <Route exact path='/callback' component={Callback} />
                    <Route path="/show/:title" component={TvShow} />
                    <Route path="/search/:search" component={Search} />
                </Switch>
            </Router>
        </div>
        )
    }
}

export default withRouter(App);
