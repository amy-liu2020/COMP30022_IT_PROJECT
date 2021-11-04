import {
    GetContactPhoto,
    GetPhoto,
    UploadContactPhoto,
    uploadPhoto,
} from "../api";
import {
    Avatar,
    IconButton,
    Input,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { useState, useEffect } from "react";

// dialog for upload photo
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
        if (id) {
            UploadContactPhoto(formData, id).then((res) => {
                console.log(res);
                setPending(false);
                setOpen(false);
            });
        } else {
            uploadPhoto(formData).then((res) => {
                console.log(res);
                setPending(false);
                setOpen(false);
            });
        }

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
                <Avatar
                    src={preview}
                    sx={{ width: "200px", height: "200px", margin: "15px" }}
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
                        sx={{
                            width: "200px",
                            marginTop: "10px",
                            marginLeft: "15px",
                        }}
                    >
                        select photo
                    </Button>
                </label>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCreate}>
                    {pending ? "uploading..." : "upload"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

// avatar for profile
export const ProfilePhoto = ({ size, editable }) => {
    const { photo, loading, error } = GetPhoto();
    const [showDialog, setShowDialog] = useState(false);

    const editPhotoHandler = () => {
        setShowDialog(true);
    };

    if (editable) {
        return (
            <>
                {showDialog && (
                    <UploadPhotoDialog
                        open={showDialog}
                        setOpen={setShowDialog}
                    />
                )}
                <IconButton
                    type="button"
                    onClick={editPhotoHandler}
                    sx={{
                        width: size,
                        height: size,
                        alignSelf: "center",
                    }}
                >
                    <Avatar
                        src={photo}
                        sx={{ width: "100%", height: "100%", bgcolor: "#fff" }}
                    />
                </IconButton>
            </>
        );
    }

    return (
        <Avatar
            src={photo}
            sx={{ width: size, height: size, bgcolor: "#fff" }}
        />
    );
};

// avatar for contact
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
                <Avatar src={photo} sx={{ width: size, height: size }} />
            </IconButton>
        </>
    );
};