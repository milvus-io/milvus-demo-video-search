import React from "react";
import Search from './containers/Search'
import Library from './components/Library'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Search} />
        <Route path="/library" component={Library} />
      </Switch>
    </Router>
  );
};

export default App;
