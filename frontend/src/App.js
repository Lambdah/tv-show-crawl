import React from 'react';
import './App.css';
import Header from './Header';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Categories from './Categories';
import NewRelease from './newRelease';
import Home from './Home';
import Networks from './Networks';
import TvShow from "./tvShow";
import Search from "./Search";

function App() {
  return (

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
            <Route path="/show/:title" children={<TvShow />} />
            <Route path="/search/:search" component={Search} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
