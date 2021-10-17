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
import { useForm } from "react-hook-form";
import React from "react";
import { useState, useMemo, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const dark = createTheme({
    palette: {
      primary: {
        lighter: "#6E7F8A",
        main: "#d3e5fa",
        darker: "#2F4656",
        contrastText: '#000',
      },
      secondary: {
        main: "#88e2d5",
        contrastText: '#000',
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
