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
import { Nav } from "./common/nav";
import { useForm } from "react-hook-form";

import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "./common/logo";
// mui
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import SideMenu from "./common/sideMenu";
import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";
import { Divider, Input, Select } from "@mui/material";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";
import { MuiSelect, MuiText } from "./common/mui";

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

const FormField = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "15px",
}));

function App() {
    // const { register, handleSubmit, control } = useForm({
    //     defaultValues: {
    //         Select: [],
    //         test: "",
    //     },
    // });

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
