import "./App.css";
// import { Contact } from './components/Contact';
// import { Meeting } from './components/Meeting';
// import { Profile } from './components/Profile';
// import { Setting } from './components/Setting';
// import { Login, Register, Forget, ForgetInputPassword } from './components/Login';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import Contact from "./pages/contact";
import Meeting from "./pages/meeting";
import User from "./pages/user";

function App() {
    return (
        // <Router>
        //   <Switch>
        //     <Route path="/contact"><Contact/></Route>
        //     <Route path="/meeting"><Meeting/></Route>
        //     <Route path='/profile' component={Profile}></Route>
        //     <Route path='/register' component={Register}></Route>
        //     <Route path='/fgpassword' component={ForgetInputPassword}></Route>
        //     <Route path='/forget' component={Forget}></Route>
        //     <Route exact path='/' component={Login}></Route>
        //     <Route path="/setting"><Setting/></Route>
        //     <Route path="/"><p>404 not found</p></Route>
        //   </Switch>
        // </Router>
        <Router>
            <Switch>
                <Route path="/contact">
                    <Contact />
                </Route>
                <Route path="/meeting">
                    <Meeting />
                </Route>
                <Route path="/user">
                    <User />
                </Route>
                <Route exact path="/">
                    <Redirect to="/user/login" />
                </Route>
                <Route path="/">
                    <p>404 not found</p>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
