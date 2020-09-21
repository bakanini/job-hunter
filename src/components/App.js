import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import '../styles/App.css';
import Home from './Home';
import Jobs from './Jobs';
import SavedJobs from './SavedJobs';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/jobs">
          <Jobs />
        </Route>
        <Route path="/savedjobs">
          <SavedJobs />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
