import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { Getprofile, changeDetails, changePassword } from "../api";
import { useState, useEffect } from "react";
import { ProfilePhoto } from "../common/avatar";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CenterBox, TwoPartBox } from "../common/layout";
import {
    Box,
    Button,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormRecord } from "../common/inputField";
import { Nav } from "../common/nav";
import Loading from "../common/loading";
import { ErrorModal } from "../common/errorModal";

const Reset = () => {
    const Schema = yup.object().shape({
        OldPassword: yup
            .string()
            .ensure()
            .required("Password is required.")
            .min(8, "Password must at least 8 characters.")
            .max(16, "Password must not exceed 16 characters."),
        NewPassword: yup
            .string()
            .ensure()
            .required("Password is required")
            .min(8, "Password must at least 8 characters.")
            .max(16, "Password must not exceed 16 characters."),
        ConfirmPassword: yup
            .string()
            .test(
                "passwords-match",
                "Confirm password must match password.",
                function (value) {
                    return this.parent.NewPassword === value;
                }
            ),
    });

    let history = useHistory();
    const [showPass0, setShowPass0] = useState(false);
    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(Schema),
        defaultValues: {
            OldPassword: "",
            NewPassword: "",
            ConfirmPassword: "",
        },
    });

    const showPass0Handler = () => {
        setShowPass0(!showPass0);
    };

    const showPass1Handler = () => {
        setShowPass1(!showPass1);
    };

    const showPass2Handler = () => {
        setShowPass2(!showPass2);
    };

    const onSubmit = (data) => {
        console.log(data);

        changePassword(data).then((res) => {
            alert(res);
            if (res === "Password has been changed successfully.") {
                history.push("/user/profile");
            }
        });
    };

    return (
        <CenterBox
            width="20vw"
            height="60vh"
            minWidth="400px"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
            }}
        >
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                Change Password
            </Typography>
            <Controller
                name="OldPassword"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        placeholder="Old Password"
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
                name="NewPassword"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        placeholder="New Password"
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
                name="ConfirmPassword"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        placeholder="Confirm Password"
                        fullWidth
                        {...field}
                        error={error !== undefined}
                        helperText={error ? error.message : " "}
                        type={showPass2 ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={showPass2Handler}
                                        edge="end"
                                    >
                                        {showPass2 ? (
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
                <Button variant="contained" onClick={() => history.goBack()}>
                    cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                    sx={{ float: "right" }}
                >
                    save
                </Button>
            </Box>
        </CenterBox>
    );
};

const Detail = () => {
    const phoneReg =
        /^((\+61\s?)?(\((0|02|03|04|07|08)\))?)?\s?\d{1,4}\s?\d{1,4}\s?\d{0,4}$/;

    const Schema = yup.object().shape({
        UserName: yup
            .string()
            .ensure()
            .required("Username is required.")
            .min(8, "Username must at least 8 characters.")
            .max(16, "Username must not exceed 16 characters."),
        Email: yup.string().ensure().email("Invalid email format"),
        PhoneNumber: yup.string().ensure().matches(phoneReg, {
            message: "Invalid phone number format",
            excludeEmptyString: true,
        }),
    });

    let history = useHistory();
    const { reset, control, handleSubmit } = useForm({
        resolver: yupResolver(Schema),
        defaultValues: {
            UserID: "",
            UserName: "",
            Email: "",
            PhoneNumber: "",
        },
    });
    const [viewOnly, setViewOnly] = useState(true);
    const { data, loading, error } = Getprofile();

    const onEdit = () => {
        setViewOnly(false);
    };

    const onCancel = () => {
        setViewOnly(true);
    };

    const onSubmit = (data) => {
        changeDetails(data).then((res) => {
            alert(res);
            if (res === "Edit user information successfully.") {
                setViewOnly(true);
            }
        });
    };

    useEffect(() => {
        reset(data);
    }, [data]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorModal error={error} />;
    }

    return (
        <CenterBox
            width="20vw"
            height="60vh"
            minWidth="400px"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
            }}
        >
            <ProfilePhoto size="180px" editable={true} />
            <p> </p>
            <FormRecord name="UserID" label="User ID" viewOnly={true} control={control} />
            <FormRecord name="UserName" label="User Name" viewOnly={viewOnly} control={control} />
            <FormRecord
                name="Email"
                viewOnly={viewOnly}
                control={control}
                type="email"
            />
            <FormRecord
                name="PhoneNumber"
                label="Phone Number"
                viewOnly={viewOnly}
                control={control}
                type="tel"
            />
            {viewOnly ? (
                <Box>
                    <Button variant="contained" onClick={onEdit}>
                        edit info
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => history.push("/profile/reset")}
                        sx={{ float: "right" }}
                    >
                        change password
                    </Button>
                </Box>
            ) : (
                <Box>
                    <Button variant="contained" onClick={onCancel}>
                        cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                        sx={{ float: "right" }}
                    >
                        save
                    </Button>
                </Box>
            )}
        </CenterBox>
    );
};

const Profile = () => {
    let { path } = useRouteMatch();

    return (
        <TwoPartBox>
            <Nav />
            <Switch>
                <Route exact path={[`${path}/reset`]}>
                    <Reset />
                </Route>
                <Route exact path={path}>
                    <Detail />
                </Route>
            </Switch>
        </TwoPartBox>
    );
};

export default Profile;
