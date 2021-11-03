import { Nav } from "./nav";
import { Route, useRouteMatch, useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, palette } from "@mui/system";
import { Typography, Stack, Button } from "@mui/material";
import { GetTheme } from "../api";
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

export const SettingP = ({setTemp}) => {
    let { userID } = useParams();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();


    const onSubmitHandler = (data) => {
        console.log(data);
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
            <Nav/>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Box sx={{ gridArea: "main" }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "15px"
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute', left: '15%', top: '23%',
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <Typography variant="h3">Setting</Typography>
                            <Typography variant="h5">change colour theme</Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                columnGap: "20px",
                                position: 'absolute', left: '83%', top: '26%',
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    color: "black"
                                }}
                                // onClick={() => ResetTheme()}
                            >
                                cancel
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    color: "black"
                                }}
                            >
                                save
                            </Button>
                        </Box>

                        <Stack direction="row" spacing={7}
                            sx={{
                                position: 'absolute', left: '50%', top: '60%',
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <Box
                                bgcolor="#2F4656"
                                width="170px"
                                height="325px"
                                sx={{
                                    cursor: "pointer"
                                }}
                                onClick={ () => {setTemp(dark)} } 
                            ></Box>
                            <Box
                                bgcolor="#C97070"
                                width="170px"
                                height="325px"
                                sx={{
                                    cursor: "pointer"
                                }}
                                onClick={ () => {setTemp(red)} } 
                            ></Box>
                            <Box
                                bgcolor="#63ADB8"
                                width="170px"
                                height="325px"
                                sx={{
                                    cursor: "pointer"
                                }}
                                onClick={ () => {setTemp(blue)} }></Box>
                            <Box
                                bgcolor="#77CFC3"
                                width="170px"
                                height="325px"
                                sx={{
                                    cursor: "pointer"
                                }}
                                onClick={ () => {setTemp(green)} }></Box>
                        </Stack>
                        
                    </Box>
                    {/* <button
                        className="setting-button"
                        type="button"
                        onClick={() => SetTheme(user.Color)}
                    >
                        cancel
                    </button>
                    <button className="setting-button" type="submit">
                        save
                    </button>
                    <div
                        class="box blue"
                        onClick={() => SetTheme("blue")}
                        {...register("Color")}
                    ></div>
                    <div
                        class="box red"
                        onClick={() => SetTheme("red")}
                        {...register("Color")}
                    ></div>
                    <div
                        class="box green"
                        onClick={() => SetTheme("green")}
                        {...register("Color")}
                    ></div>
                    <div
                        class="box dark"
                        onClick={() => SetTheme("dark")}
                        {...register("Color")}
                    ></div> */}
                </Box>
            </form>
        </Box>
    );
};

// render setting page
const Setting = () => {
    let { path } = useRouteMatch();
    const [temp, setTemp] = useState(green);
    
    return (
        <ThemeProvider theme={temp}>
            <div className="two-part-layout">
                <Route exact path={path}>
                    <SettingP setTemp={setTemp}/>
                </Route>
            </div>
        </ThemeProvider>
    );
};

// set theme
// export const SetTheme = (color) => {
//     if (color === "dark") {
//         document.documentElement.style.setProperty("--nav-bg-color", "#6E7F8A");
//         document.documentElement.style.setProperty(
//             "--sideM-bg-color",
//             "#2F4656"
//         );
//         document.documentElement.style.setProperty(
//             "--content-bg-color",
//             "#d3e5fa"
//         );
//     } else if (color === "red") {
//         document.documentElement.style.setProperty("--nav-bg-color", "#EDCACA");
//         document.documentElement.style.setProperty(
//             "--sideM-bg-color",
//             "#C97070"
//         );
//         document.documentElement.style.setProperty(
//             "--content-bg-color",
//             "#FFF8F9"
//         );
//     } else if (color === "blue") {
//         document.documentElement.style.setProperty("--nav-bg-color", "#63D5DA");
//         document.documentElement.style.setProperty(
//             "--sideM-bg-color",
//             "#63ADB8"
//         );
//         document.documentElement.style.setProperty(
//             "--content-bg-color",
//             "#d4f4f8"
//         );
//     } else {
//         document.documentElement.style.setProperty("--nav-bg-color", "#8BE8DA");
//         document.documentElement.style.setProperty(
//             "--sideM-bg-color",
//             "#77CFC3"
//         );
//         document.documentElement.style.setProperty(
//             "--content-bg-color",
//             "#EBF8F6"
//         );
//     }
// };

// get theme
// const GetTheme = () => {
//     if (
//         document.documentElement.style.getPropertyValue("--nav-bg-color") ===
//         "#6E7F8A"
//     ) {
//         return "dark";
//     } else if (
//         document.documentElement.style.getPropertyValue("--nav-bg-color") ===
//         "#EDCACA"
//     ) {
//         return "red";
//     } else if (
//         document.documentElement.style.getPropertyValue("--nav-bg-color") ===
//         "#D0EBEE"
//     ) {
//         return "blue";
//     } else {
//         return "green";
//     }
// };

// reset theme
// const ResetTheme = () => {
//     SetTheme(GetTheme());
// }


export default Setting;