import React from 'react';
import axios from 'axios';

export default class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            network: [],
            episode: [],
            tag: [],
            tvShow: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(){
        axios.get(`http://localhost:8018/networks/title/${this.state.search}`)
            .then(res => {
                const tvShow = res.data;
                this.setState({tvShow});
            });
        axios.get(`http://localhost:8018/networks/tags/${this.state.search}`)
            .then(res => {
                const tag = res.data;
                this.setState({tag});
            });
        axios.get(`http://localhost:8018/networks/tv/${this.state.search}`)
            .then(res => {
                const network = res.data;
                this.setState({network});
            });
        axios.get(`http://localhost:8018/episodes/title/${this.state.search}`)
            .then(res => {
                const episode = res.data;
                this.setState({episode});
            })
    }

    handleChange(event){
        this.setState({search: event.target.value});
    }

    componentDidMount() {
        const search = this.props.match.params.search;
        this.setState({search: search});
    }

    render(){
        return(
            <div className="container">
                <div className="display-3 text-left">Find the right poop search...</div>
                <form>
                    <input className="form-control my-5" type="search" placeholder="Search" aria-label="Search" value={this.state.search} onChange={this.handleChange}/>
                </form>
                <div className="display-4 text-left">Results</div>
                {!this.state.episode && this.state.episode.length === 0 ? <p></p> : this.state.episode.map(item =>
                    <p>{item.title}</p>
                )}
                {!this.state.network && this.state.network.length === 0 ? <p></p> : this.state.network.map(network =>
                    <p>{network.network}</p>
                )}
            </div>

        )
    }


}