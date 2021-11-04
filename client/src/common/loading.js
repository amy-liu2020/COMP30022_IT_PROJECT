import { CircularProgress, Backdrop } from "@mui/material";

const Loading = () => {
    return (
        <Backdrop
            sx={{
                color: "#fff",
            }}
            open={true}
        >
            <CircularProgress size={120} />
        </Backdrop>
    );
};

export default Loading;
