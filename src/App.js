import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./components/home";
import Header from "./components/header";
import Detail from "./components/detail";

function App() {
  return (
      <Router>
        <div >
          <Header />
          <Switch>
              <Route path="/detail/:id" component={Detail}/>
            <Route exact path="/" component={Home}/>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
