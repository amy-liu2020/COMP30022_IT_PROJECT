// navigation bar which contains logo, tabs, search bar, setting and profile photo
import { MdSettings } from "react-icons/md";
import Logo from "./logo";
import Avatar from '@mui/material/Avatar';
import SearchBar from "./searchBar";
import { Link, useHistory } from "react-router-dom";
// import { useState } from "react/cjs/react.development";
import { useState } from "react";

// navigate user to selected tab
const NavigationBar = () => {
    const [show, setShow] = useState(false);
    let history = useHistory();

    return (
        <div className="nav">
            <Logo width={70} />
            <Link className="nav-tab" to="/contact">
                contact
            </Link>
            <Link className="nav-tab" to="/meeting">
                meeting
            </Link>
            <SearchBar className="nav-search" />
            <div className="nav-setting">
                <MdSettings
                    size={40}
                    onClick={() => history.push("/user/setting")}
                />
            </div>
            <div className="avatar-buttons" onClick={() => setShow(!show)}>
                <Avatar>H</Avatar>
                {show && (
                    <ul>
                        <li>
                            <Link to="/user/profile">profile</Link>
                        </li>
                        <li>
                            <Link to="/" onClick={() => localStorage.setItem("token", "")}>log out</Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default NavigationBar;
