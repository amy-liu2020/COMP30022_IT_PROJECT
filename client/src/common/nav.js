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
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Paper } from "@mui/material";
import { useForm } from "react-hook-form";

// navigate user to selected tab
const NavigationBar = ({tagOf}) => {
    const [show, setShow] = useState(false);
    let history = useHistory();
    const tab = tagOf === "C" ? "C" : "M";

    return (
        <div className="nav">
            <Logo width={70} />
            <Link className="nav-tab" to="/contact">
                contact
            </Link>
            <Link className="nav-tab" to="/meeting">
                meeting
            </Link>
            <SearchBar tagOf={tab} className="nav-search" />
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
                            <Link
                                to="/"
                                onClick={() =>
                                    localStorage.setItem("token", "")
                                }
                            >
                                log out
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

const Search = ({tab}) => {
    const { register, handleSubmit } = useForm();
    let history = useHistory();

    const onSubmitHandler = (data) => {
        history.push(`/${tab}/search/${data.keyword}`);
    };

    return (
        <Box
            sx={{
                marginLeft: "auto",
                paddingLeft: "20px",
                borderRadius: "20px",
                bgcolor: "#ffffff",
                opacity: 0.4,
                "&:hover": {
                    opacity: 0.7,
                },
            }}
        ><form onSubmit={handleSubmit(onSubmitHandler)}>
            <TextField
                variant="standard"
                placeholder="search..."
                color="secondary"
                {...register("keyword", {
                    required: true,
                })}
                type="search"
                sx={{ margin: "5px" }}
            />
            <IconButton type="submit">
                <SearchIcon color="secondary" />
            </IconButton>
            </form>
        </Box>
    );
};

export const Nav = ({tab}) => {
    let history = useHistory();
    const [anchorEl, setAnchorEl] = useState(false);
    const open = Boolean(anchorEl);

    const onLogOutHandler = () => {
        // clear token
        localStorage.clear();

        // redirect to login page
        history.push("/");
    };

    return (
        <Box
            sx={{
                gridArea: "header",
                bgcolor: "#8BE8DA",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                columnGap: "20px",
                paddingLeft: "40px",
            }}
        >
            <Logo width={70} />
            <Button
                variant="text"
                color="secondary"
                onClick={() => history.push("/contact")}
            >
                Contact
            </Button>
            <Button
                variant="text"
                color="secondary"
                onClick={() => history.push("/meeting")}
            >
                Meeting
            </Button>
            <Search tab={tab} />
            <IconButton onClick={() => history.push("/user/setting")}>
                <SettingsIcon color="secondary" sx={{ fontSize: 30 }} />
            </IconButton>
            <Button
                disableRipple
                sx={{ marginRight: "20px" }}
                onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}
            >
                <Avatar
                    sx={{
                        bgcolor: "#ffffff",
                        color: "#000000",
                    }}
                />
            </Button>
            <Popper open={open} anchorEl={anchorEl} placement="bottom-end">
                <Paper>
                    <ClickAwayListener
                        onClickAway={() => {
                            setAnchorEl(null);
                        }}
                    >
                        <MenuList autoFocusItem={open}>
                            <MenuItem
                                onClick={() => history.push("/user/profile")}
                            >
                                Profile
                            </MenuItem>
                            <MenuItem onClick={onLogOutHandler}>
                                Logout
                            </MenuItem>
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </Box>
    );
};

export default NavigationBar;
