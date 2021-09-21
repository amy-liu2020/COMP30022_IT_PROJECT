import './App.css';
//import { Contact } from './components/Contact';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SideMenu } from './components/SideMenu';
import { NavigationBar } from './components/NavigationBar'

const Login = () => {
  return (
  <div>
    <p>Login page</p>
  </div>)
}

const Meeting = () => {
  return (
  <div className="three-part-layout">
    <NavigationBar/>
    <SideMenu tab={"meeting"}/>
  </div>)
}

const Contact = () => {
  return (
  <div className="three-part-layout">
    <NavigationBar/>
    <SideMenu tab={"contact"}/>
  </div>)
}

function App() {

  return (
    <Router>
      <Switch>
        <Route path='/contact' component={Contact}></Route>
        <Route path='/meeting' component={Meeting}></Route>
        <Route path='/' component={Login}></Route>
      </Switch>
    </Router>
  );
}

export default App;
