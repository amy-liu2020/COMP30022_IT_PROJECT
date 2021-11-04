import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import NavigationBar from "../common/nav";
import Logo from "../common/logo";
import Setting from "../common/setting";
import {
    LoginUser,
    GetRegister,
    RegisterUser,
    Getprofile,
    changeDetails,
    changePassword,
    getSecurityQuestion,
    verifyForgetPass,
} from "../api";
import { useState, useEffect } from "react";
import ProfilePhoto from "../common/avatar";
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
    Select,
    MenuItem,
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
            .required("password is required")
            .min(8, "password must at least 8 characters")
            .max(16, "password must not exceed 16 characters"),
        NewPassword: yup
            .string()
            .ensure()
            .required("password is required")
            .min(8, "password must at least 8 characters")
            .max(16, "password must not exceed 16 characters"),
        ConfirmPassword: yup
            .string()
            .test(
                "passwords-match",
                "confirm password must match password",
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
            if (res === "password has been changed successfully") {
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
                Change password
            </Typography>
            <Controller
                name="OldPassword"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        placeholder="OldPassword"
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
                        placeholder="NewPassword"
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
                        placeholder="ConfirmPassword"
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
            .required("Username is required")
            .min(8, "Username must at least 8 characters")
            .max(16, "Username must not exceed 16 characters"),
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
            if (res === "Edit user information successfully") {
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
            <FormRecord name="UserID" viewOnly={true} control={control} />
            <FormRecord name="UserName" viewOnly={viewOnly} control={control} />
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
                        onClick={() => history.push("/user/profile/reset")}
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
                <Route path={[`${path}/reset`]}>
                    <Reset />
                </Route>
                <Route exact path={path}>
                    <Detail />
                </Route>
            </Switch>
        </TwoPartBox>
    );
};

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
                        onClick={() => history.push(`/user/register`)}
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
                    onClick={() => history.push("/user/forget/checkId")}
                >
                    forget password
                </Typography>
            </CenterBox>
        </Box>
    );
};

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
                history.push("/user/login");
            }
        });
    };

    if (error) {
        return <p>error</p>;
    }

    if (loading) {
        return <p>loading</p>;
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

const Forget = () => {
    const [question, setQuestion] = useState(null);
    const [userId, setUserId] = useState("");

    return (
        <TwoPartBox>
            <Box
                sx={{
                    gridArea: "header",
                    bgcolor: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "20px",
                }}
            >
                <Logo width={70} />
            </Box>
            {question ? (
                <VerifyAns
                    question={question}
                    setQuestion={setQuestion}
                    userId={userId}
                />
            ) : (
                <CheckId setQuestion={setQuestion} setUserId={setUserId} />
            )}
        </TwoPartBox>
    );
};

const CheckId = ({ setQuestion, setUserId }) => {
    const Schema = yup.object().shape({
        UserID: yup
            .string()
            .ensure()
            .required("userId is required")
            .min(8, "userId must at least 8 characters")
            .max(16, "userId must not exceed 16 characters"),
    });
    let history = useHistory();
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(Schema),
        defaultValues: {
            UserID: "",
        },
    });

    const onSubmit = (data) => {
        getSecurityQuestion(data).then((res) => {
            if (res.msg) {
                setUserId(data.UserID);
                setQuestion(res.securityQuestion);
            } else {
                alert(res);
            }
        });
    };

    return (
        <CenterBox>
            <Typography variant="h4" sx={{marginBottom: "20px"}}>Check UserID</Typography>
            <FormRecord control={control} name="UserID" viewOnly={false} />
            <Button variant="contained" onClick={() => history.goBack()}>
                cancel
            </Button>
            <Button
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                sx={{ float: "right" }}
            >
                next
            </Button>
        </CenterBox>
    );
};

const VerifyAns = ({ setQuestion, question, userId }) => {
    const Schema = yup.object().shape({
        UserID: yup
            .string()
            .ensure()
            .required("userId is required")
            .min(8, "userId must at least 8 characters")
            .max(16, "userId must not exceed 16 characters"),
        Answer: yup
            .string()
            .ensure()
            .required("answer is required")
            .max(40, "answer must not exceed 40 characters"),
        NewPassword: yup
            .string()
            .ensure()
            .required("password is required")
            .min(8, "password must at least 8 characters")
            .max(16, "password must not exceed 16 characters"),
        ConfirmPassword: yup
            .string()
            .test(
                "passwords-match",
                "confirm password must match password",
                function (value) {
                    return this.parent.NewPassword === value;
                }
            ),
    });
    let history = useHistory();
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(Schema),
        defaultValues: {
            Question: question,
            UserID: userId,
            Answer: "",
            NewPassword: "",
            ConfirmPassword: "",
        },
    });

    const onSubmit = (data) => {
        console.log(data)

        verifyForgetPass(data).then(res => {
            alert(res)
            history.push("/user/login")
        })
    };

    return (
        <CenterBox >
            <Typography variant="h4" sx={{marginBottom: "20px"}}>Change password</Typography>
            <FormRecord control={control} name="Question" viewOnly={true} />
            <FormRecord control={control} name="Answer" viewOnly={false} />
            <FormRecord control={control} name="NewPassword" viewOnly={false} />
            <FormRecord
                control={control}
                name="ConfirmPassword"
                viewOnly={false}
                labelWidth="280px"
            />
            <Button variant="contained" onClick={() => setQuestion(null)}>
                cancel
            </Button>
            <Button
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                sx={{ float: "right" }}
            >
                confirm
            </Button>
        </CenterBox>
    );
};

const User = () => {
    let { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/login`}>
                <Login />
            </Route>
            <Route path={`${path}/register`}>
                <Register />
            </Route>
            <Route path={`${path}/profile`}>
                <Profile />
            </Route>
            <Route path={`${path}/setting`}>
                <Setting />
            </Route>
            <Route path={`${path}/forget`}>
                <Forget />
            </Route>
        </Switch>
    );
};

export default User;
