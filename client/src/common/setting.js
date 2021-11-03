import { Nav } from "./nav";
import { Route, useRouteMatch, useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";
import { Typography, Stack,Button } from "@mui/material";
import { GetTheme } from "../api";

export const SettingP = () => {
    let { userID } = useParams();
    const [theme, setTheme] = useState(GetTheme(userID));

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
                                onClick={() => ResetTheme(userID)}
                            >
                                cancel
                            </Button>
                            <Button
                                variant="contained"
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
                                onClick={() => SetTheme("dark")}
                            ></Box>
                            <Box
                                bgcolor="#C97070"
                                width="170px"
                                height="325px"
                                sx={{
                                    cursor: "pointer"
                                }}
                                onClick={() => SetTheme("red")}
                            ></Box>
                            <Box
                                bgcolor="#63ADB8"
                                width="170px"
                                height="325px"
                                sx={{
                                    cursor: "pointer"
                                }}
                                onClick={() => SetTheme("blue")}
                            ></Box>
                            <Box
                                bgcolor="#77CFC3"
                                width="170px"
                                height="325px"
                                sx={{
                                    cursor: "pointer"
                                }}
                                onClick={() => SetTheme("green")}
                            ></Box>
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

    return (
        <div className="two-part-layout">
            <Route exact path={path}>
                <SettingP />
            </Route>
        </div>
    );
};

// set theme
export const SetTheme = (color) => {
    if (color === "dark") {
        document.documentElement.style.setProperty("--nav-bg-color", "#6E7F8A");
        document.documentElement.style.setProperty(
            "--sideM-bg-color",
            "#2F4656"
        );
        document.documentElement.style.setProperty(
            "--content-bg-color",
            "#d3e5fa"
        );
    } else if (color === "red") {
        document.documentElement.style.setProperty("--nav-bg-color", "#EDCACA");
        document.documentElement.style.setProperty(
            "--sideM-bg-color",
            "#C97070"
        );
        document.documentElement.style.setProperty(
            "--content-bg-color",
            "#FFF8F9"
        );
    } else if (color === "blue") {
        document.documentElement.style.setProperty("--nav-bg-color", "#63D5DA");
        document.documentElement.style.setProperty(
            "--sideM-bg-color",
            "#63ADB8"
        );
        document.documentElement.style.setProperty(
            "--content-bg-color",
            "#d4f4f8"
        );
    } else {
        document.documentElement.style.setProperty("--nav-bg-color", "#8BE8DA");
        document.documentElement.style.setProperty(
            "--sideM-bg-color",
            "#77CFC3"
        );
        document.documentElement.style.setProperty(
            "--content-bg-color",
            "#EBF8F6"
        );
    }
};

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
const ResetTheme = (userID) => {
    SetTheme(GetTheme(userID));
}


export default Setting;