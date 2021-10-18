import { GetPhoto } from "../api";
import { Avatar } from "@mui/material";

const ProfilePhoto = ({ size }) => {
    const { data: photo } = GetPhoto();
    return (
        <Avatar
            alt="avatar"
            src={photo && "data:;base64," + photo.photo}
            sx={{ width: size, height: size, bgcolor: "#fff" }}
        />
    );
};

export default ProfilePhoto;
