// navigation bar which contains logo, tabs, search bar, setting and profile photo
import { MdSettings } from "react-icons/md";
import Logo from "./logo";
import Avatar from "@mui/material/Avatar";
import SearchBar from "./searchBar";
import { Link, useHistory } from "react-router-dom";
// import { useState } from "react/cjs/react.development";
import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";

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

const Nav = () => {
    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <Logo />
            <Button variant="text">Contact</Button>
            <Button variant="text">Meeting</Button>
            <IconButton color="primary">
                <SettingsIcon sx={{ fontSize: 30 }}/>
            </IconButton>

            <Avatar>H</Avatar>
        </Stack>
    );
};

export default NavigationBar;
