import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
    return (
        <Box
            sx={{
                position: "absolute",
                display: "flex",
                width: "100vw",
                height: "100vh",
                bgcolor: "rgba(0, 0, 0, 0.4)",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <CircularProgress size={180} />
        </Box>
    )
}

export default Loading;