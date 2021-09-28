import { NavigationBar } from "./NavigationBar";
import { SideMenu } from "./SideMenu";
import { MdAdd } from "react-icons/md";
import { Tag } from "./Tag"
import { Switch, Route, useRouteMatch, useHistory, useParams} from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";


const SettingP = () => {

    let history = useHistory();
    const [setting, setSetting] = useState([]);

    const onChangeHandler = (e) => {
        setSetting((prevSetting) => ({...prevSetting, [e.target.name] : e.target.value}))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        history.push('/setting');
    }

    return  (
        <div className="setting">
            <div className="setting-form">
                SETTING
            </div>
            <div className="setting-form">
                change colour theme
            </div>
            <button className="detail-edit" type="button" onClick={() => history.push(`/setting`)}>cancel</button>
            <button className="detail-edit" type="button" onClick={() => history.push(`/setting`)}>save</button>
            <div class="box blue" onClick={() => setTheme("blue")}></div>
            <div class="box red" onClick={() => setTheme("red")}></div>
            <div class="box green" onClick={() => setTheme("green")}></div>
            <div class="box dark" onClick={() => setTheme("dark")}></div>

        </div>
    )
}


// render setting page
export const Setting = () => {

    let { path } = useRouteMatch();

    return (
        <div className="three-part-layout">
            <NavigationBar/>
            <SideMenu tab={"setting"}/>
            <Route exact path={path}>
                <SettingP/>
            </Route>
        </div>
    )
}


// set theme
const setTheme = (color) => {
    if( color === "green") {
        document.documentElement.style.setProperty("--nav-bg-color", "#8BE8DA");
        document.documentElement.style.setProperty("--sideM-bg-color", "#77CFC3");
        document.documentElement.style.setProperty("--content-bg-color", "#EBF8F6");
    } else if ( color === "red") {
        document.documentElement.style.setProperty("--nav-bg-color", "#EDCACA");
        document.documentElement.style.setProperty("--sideM-bg-color", "#C97070");
        document.documentElement.style.setProperty("--content-bg-color", "#FFF8F9");
    } else if ( color === "blue") {
        document.documentElement.style.setProperty("--nav-bg-color", "#D0EBEE");
        document.documentElement.style.setProperty("--sideM-bg-color", "#63ADB8");
        document.documentElement.style.setProperty("--content-bg-color", "#FAFEFF");
    } else {
        document.documentElement.style.setProperty("--nav-bg-color", "#6E7F8A");
        document.documentElement.style.setProperty("--sideM-bg-color", "#2F4656");
        document.documentElement.style.setProperty("--content-bg-color", "#FAFEFF");
    }
}

