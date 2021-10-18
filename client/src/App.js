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
import { createTheme, ThemeProvider } from "@mui/material/styles";

const dark = createTheme({
    palette: {
        primary: {
            main: "#77CFC3",
            light: "#EBF8F6",
            dark: "#8BE8DA",
        },
        secondary: {
            main: "#000000",
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={dark}>
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
        </ThemeProvider>
    );
}

export default App;
