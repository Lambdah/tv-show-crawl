import React from "react";
import {Link, withRouter} from "react-router-dom";
import auth0Client from "./Auth";


class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        };
        this.signOut = () => {
            auth0Client.signOut();
            props.history.replace('/')
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({search: event.target.value});
    }

    handleSubmit(){
        return "/search/" + this.state.search;
    }

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">TV Poop</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item my-2">
                                <Link className="nav-link" to="/new_release">New Releases<span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item my-2">
                                <Link className="nav-link" to="/networks">Networks</Link>
                            </li>
                            <li className="nav-link">
                                <Link className="nav-link" to="/categories">Categories</Link>
                            </li>
                            <li className="nav-link">
                                <Link className="nav-link" to="/subscriptions">Subscriptions</Link>
                            </li>
                        </ul>
                        {
                            !auth0Client.isAuthenticated() &&
                                <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
                        }
                        {
                            auth0Client.isAuthenticated() &&
                                <div>
                                    <label className="mr-2 mt-2 text-white">{auth0Client.getProfile().name}</label>
                                    <button className="btn btn-dark" onClick={() => {this.signOut()}}>Sign Out</button>
                                </div>
                        }
                        <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.handleChange}/>
                            <Link to={this.handleSubmit}>
                            <button className="btn btn-outline-light my-2 my-sm-0" type="Submit">Search</button>
                            </Link>
                        </form>
                    </div> {/* navbar */}
                </div> {/* container */}
            </nav>
        );
    }

}

export default withRouter(Header);