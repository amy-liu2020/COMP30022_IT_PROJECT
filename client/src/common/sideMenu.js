import { MdAdd } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
// import { useState } from "react/cjs/react.development";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GetTags, AddTag, DeleteTag } from "../api";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AddTagDialog = ({ open, setOpen, tagOf }) => {
    const [tagName, setTagName] = useState(null);
    const [isPending, setPending] = useState(false);

    const handleCreate = () => {
        // re-group data
        const tag = {
            tagName: tagName,
            tagOf: tagOf,
        };

        // send data to server
        setPending(true);
        AddTag(tag).then((data) => {
            setPending(false);
            if (data === undefined) {
                alert("error");
            } else {
                // alert(data.msg);
                window.location.reload(); // refresh page
            }
        });
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add new Tag</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter a name for new tag.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="tagName"
                    label="Tag name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {setTagName(e.target.value)}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCreate}>{isPending ? "uploading..." : "create"}</Button>
            </DialogActions>
        </Dialog>
    );
};

// pop-up that allow user to enter tagName
const PopUp = ({ tagOf, turnOff }) => {
    const [tagName, setTagName] = useState(null);
    const [isPending, setPending] = useState(false);

    // handle the tag creation
    const onSubmitHandler = (e) => {
        e.preventDefault();

        // re-group data
        const tag = {
            tagName: tagName,
            tagOf: tagOf,
        };

        // send data to server
        setPending(true);
        AddTag(tag).then((data) => {
            setPending(false);
            if (data === undefined) {
                alert("error");
            } else {
                // alert(data.msg);
                window.location.reload(); // refresh page
            }
        });
    };

    // todo: add styling for pop-up
    return (
        <div className="pop-up">
            <form onSubmit={onSubmitHandler}>
                <input
                    type="text"
                    placeholder="tagName"
                    onChange={(e) => setTagName(e.target.value)}
                    style={{
                        marginBottom: "10px",
                        width: "200px",
                        height: "30px",
                        fontSize: "20px",
                    }}
                />
                <div>
                    <button type="button" onClick={turnOff}>
                        cancel
                    </button>
                    <button type="submit" style={{ float: "right" }}>
                        {isPending ? "uploading..." : "create"}
                    </button>
                </div>
            </form>
        </div>
    );
};

// for contact, tagOf = 'C'; for meeting, tagOf = 'M'
const SideMenu = ({ tagOf }) => {
    const { tags, loading, error } = GetTags(tagOf);
    const [showPopup, setShowPopup] = useState(false);
    const [pending, setPending] = useState(false);
    const tab = tagOf === "C" ? "contact" : "meeting";
    let history = useHistory();

    // handle the removal of tag
    const onDeleteTagHandler = (tagName) => {
        // re-group data
        const tag = {
            tagName: tagName,
            tagOf: tagOf,
        };

        // send data to server
        setPending(true);
        DeleteTag(tag).then((data) => {
            setPending(false);
            if (data === undefined) {
                alert("error");
            } else {
                // alert(data.msg);
                window.location.reload(); // refresh page
            }
        });
    };

    // when tags is loading
    if (loading) {
        return <p>{loading}</p>;
    }

    // error when fail to fetch tags
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <AddTagDialog open={showPopup} setOpen={setShowPopup} tagOf={tagOf}/>
            <div className="sideM">
                <Fab
                    variant="extended"
                    onClick={() => history.push(`/${tab}/create`)}
                >
                    <AddIcon sx={{ mr: 1 }} />
                    {`create ${tab}`}
                </Fab>

                <Divider />
                <Chip
                    label="all"
                    onClick={() => history.push(`/${tab}/`)}
                    sx={{
                        "&": {
                            textAlign: "left",
                            display: "flex",
                            justifyContent: "space-between",
                        },
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        overflow: "auto",
                        maxHeight: 200,
                        alignItems: "stretch",
                    }}
                >
                    {pending ? (
                        <p>updating...</p>
                    ) : (
                        tags.map((tag, index) => (
                            <Chip
                                label={tag.label}
                                onClick={() =>
                                    history.push(`/${tab}/tag/${tag.value}`)
                                }
                                onDelete={() => onDeleteTagHandler(tag.label)}
                                sx={{
                                    "&": {
                                        textAlign: "left",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: "100%",
                                    },
                                    "&:hover": {
                                        cursor: "pointer",
                                    },
                                }}
                                deleteIcon={<DeleteIcon />}
                            />
                        ))
                    )}
                </Box>
                <Button variant="contained" onClick={() => setShowPopup(true)}>
                    add new tag
                </Button>
                <Divider />
                <Chip
                    label="bin"
                    onClick={() => history.push(`/${tab}/bin`)}
                    sx={{
                        "&": {
                            textAlign: "left",
                            display: "flex",
                            justifyContent: "space-between",
                        },
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                />
            </div>
        </>
    );
};

export default SideMenu;
