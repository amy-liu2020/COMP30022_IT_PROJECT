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
    Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

const FILE_SIZE_LIMIT = 1048576;

// dialog for upload photo
const UploadPhotoDialog = ({ open, setOpen, id }) => {
    const [photo, setPhoto] = useState(null);
    const [pending, setPending] = useState(false);
    const [preview, setPreview] = useState(null);
    const [fileTooBig, setFileTooBig] = useState(false);

    // need to limit file size
    const onChange = (e) => {
        setPhoto(e.target.files[0])

        if (e.target.files[0].size > FILE_SIZE_LIMIT) {
            setFileTooBig(true);
        }else {
            setFileTooBig(false);
        }
    }

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
                        onChange={onChange}
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
                    {fileTooBig && <Typography color="DarkRed">file is too big, must less than 1MB</Typography>}
                </label>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button disabled={fileTooBig} onClick={handleCreate}>
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