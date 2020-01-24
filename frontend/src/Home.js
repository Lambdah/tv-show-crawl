import React from 'react';
import axios from 'axios';

// export default function Home(){
//     return(
//         <div className="container">
//             Home Page
//         </div>
//     );
// }

export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tvShows: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8018/episodes`)
            .then(res => {
                const tvShows = res.data;
                this.setState({tvShows});
            })
    }

    render(){
        return(
            <div className="container">
                {this.state.tvShows.map(tvShow =>
                    <div className="card">
                        <div className="card-body">
                            <img className="card-img-top" src={tvShow.episode_poster} alt="Episode poster" />
                            <h5 className="card-title">{tvShow.episode_name}</h5>
                            <p className="card-text">{tvShow.description}</p>
                        </div>
                    </div>)}
            </div>
        )
    }
}