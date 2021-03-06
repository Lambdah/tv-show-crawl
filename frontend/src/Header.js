import React from "react";
import {Link, withRouter} from "react-router-dom";
import auth0Client from "./Auth";
import Logo from "./img/buttcrack.svg";

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            isHidden: false,
            width: 992
        };
        this.signOut = () => {
            auth0Client.signOut();
            props.history.replace('/')
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    handleChange(event){
        this.setState({search: event.target.value});
    }

    handleSubmit(){
        return "/search/" + this.state.search;
    }

    updateWindowDimensions(){
        this.setState({ width: window.innerWidth});
    }

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to="/"><img src={Logo} alt="logo" style={{maxWidth: '16.7px'}}/>TVPoopShoot</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item my-2" data-toggle={this.state.width > 991 ? "" : "collapse"} data-target="#navbarSupportedContent">
                                <Link className="nav-link" to="/new_release">New Releases<span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item my-2" data-toggle={this.state.width > 991 ? "" : "collapse"} data-target="#navbarSupportedContent">
                                <Link className="nav-link" to="/networks">Networks</Link>
                            </li>
                            <li className="nav-link" data-toggle={this.state.width > 991 ? "" : "collapse"} data-target="#navbarSupportedContent">
                                <Link className="nav-link" to="/categories">Categories</Link>
                            </li>
                            <li className="nav-link" data-toggle={this.state.width > 991 ? "" : "collapse"} data-target="#navbarSupportedContent">
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
                                    <label className="mt-2 text-white">{auth0Client.getProfile().name}</label>
                                    <button className="btn btn-dark" onClick={() => {this.signOut()}}>Sign Out</button>
                                </div>
                        }
                        <form className="form-inline my-2 my-lg-0 justify-content-center" onSubmit={this.handleSubmit}>
                            <input className="form-control mr-sm-2" type="search" placeholder="Search for your shows"
                                   aria-label="Search" onChange={this.handleChange}/>
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