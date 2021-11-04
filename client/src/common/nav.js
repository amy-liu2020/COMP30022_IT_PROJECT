// navigation bar which contains logo, tabs, search bar, setting and profile photo
import Logo from "./logo";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
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
import ProfilePhoto from "./avatar";

const Search = ({ tab }) => {
    const { register, handleSubmit } = useForm();
    let history = useHistory();

    const onSubmitHandler = (data) => {
        if (tab === "disabled") {
            return;
        } else {
            history.push(`/${tab}/search/${data.keyword}`);
        }
    };

    return (
        <Box
            sx={{
                paddingLeft: "20px",
                borderRadius: "20px",
                bgcolor: "#ffffff",
                opacity: 0.4,
                "&:hover": {
                    opacity: 0.7,
                },
            }}
        >
            <form onSubmit={handleSubmit(onSubmitHandler)}>
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

export const Nav = ({ tab }) => {
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
                bgcolor: "primary.dark",
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
            {tab && <Search tab={tab} />}
            <IconButton
                onClick={() => history.push("/user/setting")}
                sx={{ marginLeft: "auto" }}
            >
                <SettingsIcon color="secondary" sx={{ fontSize: 30 }} />
            </IconButton>
            <IconButton
                sx={{ marginRight: "20px" }}
                onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}
            >
                <ProfilePhoto size="40px" />
            </IconButton>
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

export default Nav;
