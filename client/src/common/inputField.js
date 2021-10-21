import { Controller} from "react-hook-form";
import { Box } from "@mui/system";
import { Input } from "@mui/material";

const InputField = ({
    name,
    control,
    type = "text",
    label,
    disabled = false,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "15px",
                    }}
                >
                    <Box minWidth="150px">{label}:</Box>
                    <Input
                        fullWidth
                        type={type}
                        disabled={disabled}
                        {...field}
                    />
                </Box>
            )}
        />
    );
};

export default InputField;