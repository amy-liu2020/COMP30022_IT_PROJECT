import {Nav} from "./nav";
import { Route, useRouteMatch, useParams } from "react-router-dom";
import { useState} from "react";
import { useForm } from "react-hook-form";
import users from "../json/UserList.json";


export const SettingP = () => {
    let { userID } = useParams();
    const [user, setUser] = useState([]);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        criteriaMode: "all",
        defaultValues: users[userID],
    });

    const onSubmitHandler = (data) => {
        console.log(data);
    }

    return (
        <div className="setting">
            <div className="setting-form" onSubmit={handleSubmit(onSubmitHandler)}>
                SETTING
                <div className="setting-form">change colour theme</div>
                <button
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
                ></div>
            </div>
        </div>
    );
};

// render setting page
const Setting = () => {
    let { path } = useRouteMatch();

    return (
        <div className="two-part-layout">
            <Nav tab="contact"/>
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
        document.documentElement.style.setProperty("--sideM-bg-color", "#2F4656");
        document.documentElement.style.setProperty("--content-bg-color", "#d3e5fa");
    } else if (color === "red") {
        document.documentElement.style.setProperty("--nav-bg-color", "#EDCACA");
        document.documentElement.style.setProperty("--sideM-bg-color", "#C97070");
        document.documentElement.style.setProperty("--content-bg-color", "#FFF8F9");
    } else if (color === "blue") {
        document.documentElement.style.setProperty("--nav-bg-color", "#63D5DA");
        document.documentElement.style.setProperty("--sideM-bg-color", "#63ADB8");
        document.documentElement.style.setProperty("--content-bg-color", "#d4f4f8");
    } else {
        document.documentElement.style.setProperty("--nav-bg-color", "#8BE8DA");
        document.documentElement.style.setProperty("--sideM-bg-color", "#77CFC3");
        document.documentElement.style.setProperty("--content-bg-color", "#EBF8F6");
    }
};

// get theme
const getTheme = () => {
    if (
        document.documentElement.style.getPropertyValue("--nav-bg-color") ===
        "#6E7F8A"
    ) {
        return "dark";
    } else if (
        document.documentElement.style.getPropertyValue("--nav-bg-color") ===
        "#EDCACA"
    ) {
        return "red";
    } else if (
        document.documentElement.style.getPropertyValue("--nav-bg-color") ===
        "#D0EBEE"
    ) {
        return "blue";
    } else {
        return "green";
    }
};

export default Setting;
