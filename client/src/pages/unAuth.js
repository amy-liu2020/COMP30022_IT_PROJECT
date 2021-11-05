// display when user havn't login
import { Button, Typography} from "@mui/material";
import { useHistory } from "react-router";
import { TwoPartBox, CenterBox } from "../common/layout";
import { NavJustLogo } from "../common/nav";

// display when page is not found
export const UnAuth = () => {
    let history = useHistory();

    return (
        <TwoPartBox>
            <NavJustLogo/>
            <CenterBox>
                <Typography variant="h6">You are not logged in.</Typography>
                <Button variant="contained" onClick={() => history.push("/login")}>login</Button>
            </CenterBox>
        </TwoPartBox>
    )
}