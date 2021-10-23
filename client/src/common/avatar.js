import { GetContactPhoto, GetPhoto } from "../api";
import { Avatar, IconButton } from "@mui/material";
import { useState } from "react";
import { UploadContactPhoto } from "../api";

import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ProfilePhoto = ({ size }) => {
    const { photo } = GetPhoto();

    return (
        <Avatar
            alt="avatar"
            src={photo && "data:;base64," + photo}
            sx={{ width: size, height: size }}
        />
    );
};

const UploadPhotoDialog = ({ open, setOpen, id }) => {
    const [photo, setPhoto] = useState(null);
    const [pending, setPending] = useState(false);

    const handleCreate = () => {

        // reformat data
        const formData = new FormData();
        formData.append("file", photo);

        // send to server
        setPending(true);
        UploadContactPhoto(formData, id).then((res) => {
            console.log(res);
            setPending(false);
            setOpen(false);
        });

    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Upload Contact Photo</DialogTitle>
            <DialogContent>
                <DialogContentText>Please select a photo.</DialogContentText>
                <TextField
                    autoFocus
                    label="Photo"
                    type="file"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setPhoto(e.target.files[0])}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCreate}>
                    {pending ? "uploading..." : "create"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export const ContactPhoto = ({ size, id }) => {
    const { photo } = GetContactPhoto(id);
    const [showDialog, setShowDialog] = useState(false);

    const editPhotoHandler = () => {
        setShowDialog(true);
    };

    return (
        <>
            {showDialog && (
                <UploadPhotoDialog
                    open={showDialog}
                    setOpen={setShowDialog}
                    id={id}
                />
            )}

            <IconButton type="button" onClick={editPhotoHandler}>
                <Avatar
                    alt="avatar"
                    src={photo}
                    sx={{ width: size, height: size }}
                />
            </IconButton>
        </>
    );
};

export default ProfilePhoto;
