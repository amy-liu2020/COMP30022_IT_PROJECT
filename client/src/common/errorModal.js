import { Modal, Typography } from "@mui/material";
import { CenterBox } from "./layout";
import { useState } from "react";

export const ErrorModal = ({error}) => {
    const [open, setOpen] = useState(true);

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <CenterBox bgcolor="white" padding="15px 30px">
                <Typography variant="h6">Error</Typography>
                <Typography>{error}</Typography>
            </CenterBox>
        </Modal>
    );
};
