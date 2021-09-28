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
        <div className = "settingP">
            SETTING
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

