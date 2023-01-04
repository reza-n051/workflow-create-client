import React from 'react';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import CreateWorkflow from './pages/CreateWf';
import Workflows from './pages/WorkFlows';
import EditWorkflow from './pages/EditWorkflow';

import './App.css';
import './tailwind.output.css';
import Nav from './components/Nav';
function App() {
  return (
    <div className="App">
      <Router>

        <Nav/>
        <Switch>
          <Route exact path="/"><Home /></Route>

          <Route path="/workflows"><Workflows /></Route>

          <Route path="/create-workflow"><CreateWorkflow /></Route>

          <Route path="/edit-wf/:id"><EditWorkflow /></Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;

function Home() {
  return (
    <>
      <h1 className="mt-8">HOME</h1>
    </>
  );
}