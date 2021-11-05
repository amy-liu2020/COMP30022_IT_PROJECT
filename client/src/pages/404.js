import { TwoPartBox, CenterBox } from "../common/layout";
import { Typography} from "@mui/material";
import { NavJustLogo } from "../common/nav";

// display when page is not found
export const NotFound = () => {
    return (
        <TwoPartBox>
            <NavJustLogo/>
            <CenterBox>
                <Typography variant="h6">Page is not found.</Typography>
            </CenterBox>
        </TwoPartBox>
    )
}
