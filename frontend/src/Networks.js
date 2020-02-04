import React from 'react';
import axios from 'axios';

// export default function Networks(){
//     return(
//         <div className="container">
//             Networks Page
//         </div>
//     );
// }

export default class Networks extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            networks: ["cityTV", "much"],
            tvShows: []
        };
        this.filterNetworks = this.filterNetworks.bind(this);
        this.handleUrl = this.handleUrl.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8018/networks/')
            .then(res =>{
                const tvShows = res.data;
                this.setState({tvShows});
            });
    }

    filterNetworks(network){
        return this.state.tvShows.filter(show => {
            return show.network === network;
        });
    }

    handleUrl(url){
        return `http://localhost:3000/show/${url}`
    }

    render(){
        return (
            <div className="container">
                <h1 className="display-4 text-left">Networks</h1>
                {this.state.networks.map(network =>
                    <div>
                        <h3 className="display-5 text-left">{network}</h3>
                        <div className="row">
                            {this.filterNetworks(network).map(tvShow =>
                                <div className="col-4 my-3">
                                    <img src={tvShow.poster} alt={tvShow.tvTitle} />
                                    <a className="stretched-link" href={this.handleUrl(tvShow.tvTitle)} aria-hidden={true} />
                                </div>

                            )}
                        </div>

                    </div>
                )}
            </div>
        )
    }
}