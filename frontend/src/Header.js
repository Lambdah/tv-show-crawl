import React from "react";
import {Link} from "react-router-dom";

export default function Header(){

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
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-light my-2 my-sm-0" type="Submit">Search</button>
                        </form>
                    </div> {/* navbar */}
                </div> {/* container */}
            </nav>
        );
}