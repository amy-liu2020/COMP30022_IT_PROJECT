import { CircularProgress, Backdrop } from "@mui/material";

const Loading = () => {
    return (
        <Backdrop
            sx={{
                color: "#fff",
                // zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={true}
        >
            <CircularProgress size={120} />
        </Backdrop>
    );
};

export default Loading;
