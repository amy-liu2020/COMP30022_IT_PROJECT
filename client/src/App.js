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

const dark = createTheme({
    palette: {
        primary: {
            main: "#2F4656",
            light: "#d3e5fa",
            dark: "#6E7F8A",
        },
        secondary: {
            main: "#000000",
        },
    },
});

const red = createTheme({
    palette: {
        primary: {
            main: "#C97070",
            light: "#FFF8F9",
            dark: "#EDCACA",
        },
        secondary: {
            main: "#000000",
        },
    },
});

const blue = createTheme({
    palette: {
        primary: {
            main: "#63ADB8",
            light: "#d4f4f8",
            dark: "#63D5DA",
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
    const { data, loading, error } = GetTheme();
    const userTheme = GetUserTheme(data);
    return (
        <ThemeProvider theme={red}>
            <Router>
                <Switch>
                    <PrivateRoute path="/contact">
                        <Contact />
                    </PrivateRoute>
                    <PrivateRoute path="/meeting">
                        <Meeting />
                    </PrivateRoute>
                    <Route path="/user">
                        <User />
                    </Route>
                    <Route exact path="/">
                        <Redirect to="/user/login" />
                    </Route>
                    <Route exact path="/unAuth">
                        <UnAuth/>
                    </Route>
                    <Route path={["/notFound", "*"]}>
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

const GetUserTheme = (data) => {
    let defa = JSON.parse(JSON.stringify(data));
    console.log(defa);
    // const userTheme = createTheme({
    //     palette: {
    //         primary: {
    //             main: data.primary.main,
    //             light: data.primary.light,
    //             dark: data.primary.dark
    //         },
    //         secondary: {
    //             main: data.secondary.main,
    //             // light: data.secondary.light,
    //             // dark: data.secondary.dark
    //         },
    //     },
    // });
    // return userTheme;
}


export default App;
