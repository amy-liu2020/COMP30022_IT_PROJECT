import './App.css';
import { Contact } from './components/Contact';
import { Meeting } from './components/Meeting';
import { Profile } from './components/Profile';
import { Setting } from './components/Setting';
import { Login, Register, Forget, ForgetInputPassword } from './components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from "react";

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/contact"><Contact/></Route>
        <Route path="/meeting"><Meeting/></Route>
        <Route path='/profile' component={Profile}></Route>
        <Route path='/register' component={Register}></Route>
        <Route path='/fgpassword' component={ForgetInputPassword}></Route>
        <Route path='/forget' component={Forget}></Route>
        <Route exact path='/' component={Login}></Route>
        <Route path="/setting"><Setting/></Route>
        <Route path="/"><p>404 not found</p></Route>
      </Switch>
    </Router>
  );
}

export default App;