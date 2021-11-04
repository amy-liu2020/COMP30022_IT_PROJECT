import { useState } from "react";
import { CenterBox } from "../common/layout";
import Logo from "../common/logo";
import {
    Box,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { LoginUser } from "../api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

const Login = () => {
    const Schema = yup.object().shape({
        userId: yup
            .string()
            .ensure()
            .required("userId is required")
            .min(8, "userId must at least 8 characters")
            .max(16, "userId must not exceed 16 characters"),
        password: yup
            .string()
            .ensure()
            .required("password is required")
            .min(8, "password must at least 8 characters")
            .max(16, "password must not exceed 16 characters"),
    });

    let history = useHistory();
    const [showPass, setShowPass] = useState(false);
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(Schema),
        defaultValues: {
            userId: "",
            password: "",
        },
    });

    const showPassHandler = () => {
        setShowPass(!showPass);
    };

    const onSubmit = (data) => {
        LoginUser(data).then((res) => {
            alert(res);
            if (res === "login success") {
                history.push("/contact");
                window.location.reload();
            }
        });
    };

    return (
        <Box bgcolor="primary.dark" width="100vw" height="100vh">
            <CenterBox
                width="20vw"
                height="60vh"
                minWidth="300px"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                }}
            >
                <Logo />
                <Controller
                    name="userId"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            placeholder="userId"
                            fullWidth
                            {...field}
                            error={error !== undefined}
                            helperText={error ? error.message : " "}
                            InputProps={{ style: { backgroundColor: "white" } }}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            placeholder="password"
                            fullWidth
                            {...field}
                            error={error !== undefined}
                            helperText={error ? error.message : " "}
                            type={showPass ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={showPassHandler}
                                            edge="end"
                                        >
                                            {showPass ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                style: { backgroundColor: "white" },
                            }}
                        />
                    )}
                />
                <Box>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "white" }}
                        onClick={() => history.push(`/register`)}
                    >
                        register
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "white", float: "right" }}
                        onClick={handleSubmit(onSubmit)}
                    >
                        login
                    </Button>
                </Box>

                <Typography
                    variant="captain"
                    sx={{
                        alignSelf: "center",
                        padding: "15px",
                        color: "MediumBlue",
                        cursor: "pointer",
                    }}
                    onClick={() => history.push("forget")}
                >
                    forget password
                </Typography>
            </CenterBox>
        </Box>
    );
};

export default Login;
