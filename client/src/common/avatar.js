import { GetPhoto } from "../api";
import { Avatar } from "@mui/material";

const ProfilePhoto = ({ size }) => {
    return (
        <Avatar
            alt="avatar"
            sx={{ width: size, height: size, bgcolor: "#fff", color: "secondary.main"}}
        />
    );
};

export default ProfilePhoto;
