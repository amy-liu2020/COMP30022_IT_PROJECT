import './App.css';
import { Contact } from './components/Contact';
import { Meeting } from './components/Meeting';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Login = () => {
  return (
  <div>
    <p>Login page</p>
  </div>)
}

// const Meeting = () => {
//   return (
//   <div className="three-part-layout">
//     <NavigationBar/>
//     <SideMenu groups = {groups} tab={"meeting"}/>
//   </div>)
// }

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
