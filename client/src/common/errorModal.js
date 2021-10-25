import { Modal, Typography } from "@mui/material";
import { CenterBox } from "./layout";
import { useState } from "react";

export const ErrorModal = ({error}) => {
    const [open, setOpen] = useState(true);

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <CenterBox>
                <Typography>Error</Typography>
                <Typography>{error}</Typography>
            </CenterBox>
        </Modal>
    );
};
