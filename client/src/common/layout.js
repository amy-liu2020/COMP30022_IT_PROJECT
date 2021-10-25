import { styled, Box } from '@mui/system';

// 2-part layout
export const TwoPartBox = styled(Box)({
    height: "100vh",
    weight: "100vw",
    display: "grid",
    gap: 0,
    gridTemplateRows: "60px auto",
    gridTemplateAreas: `"header header header header""main main main main "`,
});

// 3-part layout
export const ThreePartBox = styled(Box)({
    height: "100vh",
    weight: "100vw",
    display: "grid",
    gridTemplateColumns: "240px auto",
    gap: 0,
    gridTemplateRows: "60px auto",
    gridTemplateAreas: `"header header header header""sidebar main main main "`
});

// center box
export const CenterBox = styled(Box)({
    margin: "auto",
    width: "60%"
});
