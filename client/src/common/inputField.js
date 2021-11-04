import { Controller} from "react-hook-form";
import { Box } from "@mui/system";
import { Input, TextField, Typography } from "@mui/material";

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

export const FormRecord = ({
    control,
    name,
    label,
    type,
    viewOnly,
    labelWidth = "230px",
}) => {

    

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "stretch",
                    }}
                >
                    <Typography variant="h6" sx={{ width: labelWidth }}>
                        {label ? label : name}
                    </Typography>
                    <TextField
                        fullWidth
                        hiddenLabel={true}
                        variant="standard"
                        error={error !== undefined}
                        helperText={error ? error.message : " "}
                        InputProps={{
                            readOnly: viewOnly,
                        }}
                        type={type}
                        {...field}
                    />
                </Box>
            )}
        />
    );
};

export default InputField;