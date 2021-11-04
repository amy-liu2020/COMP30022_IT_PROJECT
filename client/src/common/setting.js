import { Nav } from "./nav";
import { Route, useRouteMatch } from "react-router-dom";
import { useState } from "react";
import { Box } from "@mui/system";
import { Typography, Stack, Button } from "@mui/material";
import { ChangeTheme } from "../api";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";

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

export const SettingP = ({ setTemp }) => {
    const [colorId, setColorId] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        // send saved theme to server
        ChangeTheme(colorId).then((res) => {
            alert(res.msg);
            window.location.reload();
        });
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "grid",
                gridTemplateColumns: "auto",
                gridTemplateRows: "60px auto",
                gridTemplateAreas: `"header header header header""main main main main "`,
                bgcolor: "primary.light",
            }}
        >
            <Nav />
            <form onSubmit={handleSubmit}>
                <Box sx={{ gridArea: "main" }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "15px",
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                left: "15%",
                                top: "23%",
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <Typography variant="h3">Setting</Typography>
                            <Typography variant="h5">
                                change colour theme
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                columnGap: "20px",
                                position: "absolute",
                                left: "83%",
                                top: "26%",
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    color: "black",
                                }}
                                onClick={() => setTemp(undefined)}
                            >
                                cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    color: "black",
                                }}
                            >
                                save
                            </Button>
                        </Box>

                        <Stack
                            direction="row"
                            spacing={7}
                            sx={{
                                position: "absolute",
                                left: "50%",
                                top: "60%",
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <Box
                                bgcolor="#2F4656"
                                width="170px"
                                height="325px"
                                sx={{
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    setTemp(dark);
                                    setColorId("6182658e1f3090371ea8a319");
                                }}
                            ></Box>
                            <Box
                                bgcolor="#C97070"
                                width="170px"
                                height="325px"
                                sx={{
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    setTemp(red);
                                    setColorId("6182655c1f3090371ea8a317");
                                }}
                            ></Box>
                            <Box
                                bgcolor="#63ADB8"
                                width="170px"
                                height="325px"
                                sx={{
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    setTemp(blue);
                                    setColorId("618265bf1f3090371ea8a31a");
                                }}
                            ></Box>
                            <Box
                                bgcolor="#77CFC3"
                                width="170px"
                                height="325px"
                                sx={{
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    setTemp(green);
                                    setColorId("616a44b350b370d550ad657e");
                                }}
                            ></Box>
                        </Stack>
                    </Box>
                </Box>
            </form>
        </Box>
    );
};

// render setting page
const Setting = () => {
    let { path } = useRouteMatch();
    const [temp, setTemp] = useState(undefined);

    return (
        <ThemeProvider theme={temp}>
            <div className="two-part-layout">
                <Route exact path={path}>
                    <SettingP setTemp={setTemp} />
                </Route>
            </div>
        </ThemeProvider>
    );
};

export default Setting;
