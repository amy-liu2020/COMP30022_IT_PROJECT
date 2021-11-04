import { TwoPartBox, CenterBox } from "../common/layout";
import { Typography, Box } from "@mui/material";
import Logo from "../common/logo";

// display when page is not found
export const NotFound = () => {
    return (
        <TwoPartBox>
            <Box sx={{ gridArea: "header", bgcolor: "primary.main", display: "flex", alignItems: "center", paddingLeft: "20px"}}>
                <Logo width={70}/>
            </Box>
            <CenterBox>
                <Typography variant="h6">Page is not found.</Typography>
            </CenterBox>
        </TwoPartBox>
    )
}
