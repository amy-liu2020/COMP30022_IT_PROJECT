import { useState } from "react";
import { CenterBox } from "../common/layout";
import Logo from "../common/logo";
import { Box, Button, TextField, InputAdornment, IconButton, Select, MenuItem} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { RegisterUser, GetRegister } from "../api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import Loading from "../common/loading"

const Register = () => {
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
        confirmpassword: yup
            .string()
            .test(
                "passwords-match",
                "confirm password must match password",
                function (value) {
                    return this.parent.password === value;
                }
            ),
        username: yup
            .string()
            .ensure()
            .required("username is required")
            .min(8, "username must at least 8 characters")
            .max(16, "username must not exceed 16 characters"),
        securityQuestion: yup
            .number()
            .required("need to select one security question"),
        securityAnswer: yup
            .string()
            .ensure()
            .required("answer is required")
            .max(40, "answer must not exceed 16 characters"),
    });

    let history = useHistory();
    const { data, loading, error } = GetRegister();
    const [showPass0, setShowPass0] = useState(false);
    const [showPass1, setShowPass1] = useState(false);
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(Schema),
        defaultValues: {
            userId: "",
            password: "",
            confirmpassword: "",
            username: "",
            securityQuestion: "0",
            securityAnswer: "",
        },
    });

    const showPass0Handler = () => {
        setShowPass0(!showPass0);
    };

    const showPass1Handler = () => {
        setShowPass1(!showPass1);
    };

    const onSubmit = (data) => {
        console.log(data);
        RegisterUser(data).then((res) => {
            alert(res);
            if (res === "register success") {
                history.push("/login");
            }
        });
    };

    if (loading || error) {
        return <Loading />;
    }

    return (
        <Box bgcolor="primary.dark" width="100vw" height="100vh">
            <CenterBox
                width="20vw"
                height="90vh"
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
                            type={showPass0 ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={showPass0Handler}
                                            edge="end"
                                        >
                                            {showPass0 ? (
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
                <Controller
                    name="confirmpassword"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            placeholder="confirmpassword"
                            fullWidth
                            {...field}
                            error={error !== undefined}
                            helperText={error ? error.message : " "}
                            type={showPass1 ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={showPass1Handler}
                                            edge="end"
                                        >
                                            {showPass1 ? (
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
                <Controller
                    name="username"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            placeholder="username"
                            fullWidth
                            {...field}
                            error={error !== undefined}
                            helperText={error ? error.message : " "}
                            InputProps={{ style: { backgroundColor: "white" } }}
                        />
                    )}
                />
                <Controller
                    name="securityQuestion"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <Select
                                SelectDisplayProps={{
                                    style: { backgroundColor: "white" },
                                }}
                                {...field}
                            >
                                {data.map((que) => (
                                    <MenuItem key={que.Code} value={que.Code}>
                                        {que.Question}
                                    </MenuItem>
                                ))}
                            </Select>
                            <p>{error ? error.message : " "}</p>
                        </>
                    )}
                />
                <Controller
                    name="securityAnswer"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            placeholder="answer"
                            fullWidth
                            {...field}
                            error={error !== undefined}
                            helperText={error ? error.message : " "}
                            InputProps={{ style: { backgroundColor: "white" } }}
                        />
                    )}
                />
                <Box>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "white" }}
                        onClick={() => history.goBack()}
                    >
                        cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "white", float: "right" }}
                        onClick={handleSubmit(onSubmit)}
                    >
                        register
                    </Button>
                </Box>
            </CenterBox>
        </Box>
    );
};

export default Register;