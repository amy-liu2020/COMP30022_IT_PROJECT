import { GetContactPhoto, GetPhoto } from "../api";
import { Avatar, IconButton, Input } from "@mui/material";
import { useState } from "react";
import { UploadContactPhoto } from "../api";
import { useEffect } from "react";

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
            sx={{ width: size, height: size, bgcolor: "#fff" }}
        />
    );
};

const UploadPhotoDialog = ({ open, setOpen, id }) => {
    const [photo, setPhoto] = useState(null);
    const [pending, setPending] = useState(false);
    const [preview, setPreview] = useState(null);

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

        // refresh page
        window.location.reload();
    };

    const handleClose = () => {
        setOpen(false);
    };

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!photo) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(photo);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [photo]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Upload Photo</DialogTitle>
            <DialogContent>
                <DialogContentText>Please select a photo.</DialogContentText>
                <Avatar
                    src={preview}
                    sx={{ width: "200px", height: "200px" }}
                />
                <label htmlFor="contained-button-file">
                    <Input
                        id="contained-button-file"
                        type="file"
                        sx={{ display: "none" }}
                        onChange={(e) => setPhoto(e.target.files[0])}
                    />
                    <Button
                        variant="contained"
                        component="span"
                        type="button"
                        sx={{ width: "200px", marginTop: "10px" }}
                    >
                        select photo
                    </Button>
                </label>
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
                    src={photo}
                    sx={{ width: size, height: size }}
                />
            </IconButton>
        </>
    );
};

export default ProfilePhoto;
