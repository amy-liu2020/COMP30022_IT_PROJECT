// display when user havn't login
import { Button, Typography, Box } from "@mui/material";
import { useHistory } from "react-router";
import { TwoPartBox, CenterBox } from "../common/layout";
import Logo from "../common/logo";

// display when page is not found
export const UnAuth = () => {
    let history = useHistory();

    return (
        <TwoPartBox>
            <Box sx={{ gridArea: "header", bgcolor: "primary.main", padding: "10px 20px"}}>
                <Logo width={70}/>
            </Box>
            <CenterBox>
                <Typography variant="h6">You are not logged in.</Typography>
                <Button variant="contained" onClick={() => history.push("/user/login")}>login</Button>
            </CenterBox>
        </TwoPartBox>
    )
}