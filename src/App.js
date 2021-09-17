import './App.css';
import { Contact } from './components/Contact';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Login = () => {
  return (
  <div>
    <p>Login page</p>
  </div>)
}

const Meeting = () => {
  return (
  <div>
    <p>Meeting page</p>
  </div>)
}

function App() {
  return (
    <Router>
      <Contact/>
    </Router>

    /*
    <Router>
    <div className="App">
     <Switch>
       <Route exact path='/' component={Login}></Route>
       <Route exact path='/contact' component={Contact}></Route>
       <Route exact path='/meeting' component={Meeting}></Route>
     </Switch>
    </div>
  </Router>
  */
  );
}

export default App;
