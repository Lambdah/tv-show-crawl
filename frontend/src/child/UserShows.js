import React, {Component} from 'react';
import axios from 'axios';
import SubscriptionCard from "./subscriptionCard";
import resizeImgUrl from '../helper/resizeImgUrl';
import styled from "styled-components";

const Show = styled.div`
    
`;

const Poster = styled.img`
    max-height: 10%;
    max-width: 10%;
`;

const ButtonSub = styled.button`
    
`;


class UserShows extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tvShow: [],
            isChecked: true
        };
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        console.log(this.props.title);
        const {data} = await axios.get(`http://localhost:8018/networks/title/${this.props.title}`);
        console.log(data);
        this.setState({tvShow: data});
    }

    handleChange(){
        this.setState({isChecked: !this.state.isChecked});
    }


    render(){
        return (
            <React.Fragment>
                <Show>
                    <div className="row">
                        <Poster src={resizeImgUrl(this.state.tvShow.poster, 200)} className="rounded col-4 float-left" alt="poster" />
                        <div className="col-6 display-3 text-center text-white mx-5 mt-2">{this.state.tvShow.tvTitle}</div>
                        <div className="col-3">
                            <div className="row">
                                {/*<button className="btn btn-primary ml-5 mb-3 px-4">Subscribe</button>*/}
                                <div className="custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" checked={this.state.isChecked} onClick={this.handleChange} id={this.state.tvShow.tvTitle}/>
                                    <label className="custom-control-label" for={this.state.tvShow.tvTitle}>Subscribe</label>
                                </div>
                            </div>
                            <div className="row">
                                <button className="btn btn-outline-info ml-5">Expand Episodes</button>
                            </div>
                        </div>
                    </div>

                </Show>

            </React.Fragment>

        )
    }
}

export default UserShows;