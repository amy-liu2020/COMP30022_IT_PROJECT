import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import Contact from "./pages/contact";
import Meeting from "./pages/meeting";
import Profile from "./pages/profile";
import Forget from "./pages/forget";
import Login from "./pages/login";
import Register from "./pages/register";
import Setting from "./pages/setting";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NotFound } from "./pages/404";
import { UnAuth } from "./pages/unAuth";
import { GetTheme } from "./api";

const green = createTheme({
    palette: {
        primary: {
            main: "#77CFC0",
            light: "#EBF8F6",
            dark: "#8BE8DA",
        },
        secondary: {
            main: "#000000",
        },
    },
});

function PrivateRoute({ children, ...rest }) {
    let token = localStorage.getItem("token");
    return (
        <Route
            {...rest}
            render={({ location }) =>
                token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/unAuth",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}

function App() {
    const { data } = GetTheme();

    return (
        <ThemeProvider theme={data ? createTheme(data) : green}>
            <Router>
                <Switch>
                    <PrivateRoute path="/contact">
                        <Contact />
                    </PrivateRoute>
                    <PrivateRoute path="/meeting">
                        <Meeting />
                    </PrivateRoute>
                    <PrivateRoute path="/profile">
                        <Profile />
                    </PrivateRoute>
                    <PrivateRoute path="/setting">
                        <Setting />
                    </PrivateRoute>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                    <Route exact path="/forget">
                        <Forget />
                    </Route>
                    <Route exact path="/">
                        <Redirect to="/login" />
                    </Route>
                    <Route exact path="/unAuth">
                        <UnAuth />
                    </Route>
                    <Route path={["/notFound", "*"]}>
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
