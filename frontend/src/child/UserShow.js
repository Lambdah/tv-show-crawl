import React, {Component} from 'react';
import styled from "styled-components";
import axios from 'axios';


class UserShow extends Component{
    constructor(props) {
        super(props);
        this.state = {
            today: [],
            week: [],
            month: [],
            older: []
        };
    }

    async componentDidMount() {
        console.log(this.props.subscription);
    }


    render(){

        return(
            <div>
                Today
            </div>
        )
    }
}

export default UserShow;