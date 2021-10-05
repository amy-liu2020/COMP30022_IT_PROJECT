import "./App.css";
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
