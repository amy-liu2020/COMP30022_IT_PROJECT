import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import Nav from "../common/nav";
import Logo from "../common/logo";
import Setting from "../common/setting";
import {
    loginUser,
    GetRegister,
    registerUser,
    Getprofile,
    changeDetails,
    changePassword,
} from "../api";
import { useState, useEffect } from "react";
import ProfilePhoto from "../common/avatar";

import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import InputField from "../common/inputField";
import { useForm } from "react-hook-form";
import Loading from "../common/loading";

const Reset = () => {
    let history = useHistory();
    const { handleSubmit, control } = useForm({
        defaultValues: {
            OldPassword: "",
            NewPassword: "",
            ConfirmPassword: "",
        },
    });

    const onSubmitHandler = (data) => {
        // send data to server
        // changePassword({ oldpassword, newpassword });

        // go back to profile
        history.push(`/user/profile`);
    };

    return (
        <Box
            sx={{
                gridArea: "main",
                bgcolor: "#EBF8F6",
                width: "100%",
            }}
        >
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "5px",
                        alignItems: "center",
                        marginTop: "130px",
                    }}
                >
                    <Typography variant="h4">Change Password</Typography>
                    <InputField
                        control={control}
                        name="OldPassword"
                        label="Old Password"
                        type="password"
                    />
                    <InputField
                        control={control}
                        name="NewPassword"
                        label="New Password"
                        type="password"
                    />
                    <InputField
                        control={control}
                        name="ConfirmPassword"
                        label="Confirm Password"
                        type="password"
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "320px",
                            marginTop: "20px",
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={() => history.goBack()}
                        >
                            cancel
                        </Button>
                        <Button variant="contained" type="submit">
                            save
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
};

const Edit = () => {
    let history = useHistory();
    const { data, loading, error } = Getprofile();
    const { handleSubmit, control, reset } = useForm({
        defaultValues: data,
    });

    const onSubmitHandler = (data) => {
        // send data to server
        changeDetails(data).then((res) => alert(res.msg));

        // go back to profile
        history.push("/user/profile");
    };

    useEffect(() => {
        reset(data);
    }, [data]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Box
            sx={{
                gridArea: "main",
                bgcolor: "#EBF8F6",
                width: "100%",
            }}
        >
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "5px",
                        alignItems: "center",
                    }}
                >
                    <Box marginTop="80px">
                        <ProfilePhoto size="150px" />
                        <Typography variant="h4">{data.UserID}</Typography>
                    </Box>
                    <InputField
                        name="UserName"
                        control={control}
                        label="Username"
                    />
                    <InputField
                        name="Email"
                        control={control}
                        label="Email"
                        type="email"
                    />
                    <InputField
                        name="PhoneNumber"
                        control={control}
                        label="Phone Number"
                        type="tel"
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "320px",
                            marginTop: "20px",
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={() => history.goBack()}
                        >
                            cancel
                        </Button>
                        <Button variant="contained" type="submit">
                            save
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
};

const Detail = () => {
    let history = useHistory();
    const { data, loading, error } = Getprofile();

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Box
            sx={{
                gridArea: "main",
                bgcolor: "#EBF8F6",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "15px",
                    alignItems: "center",
                }}
            >
                <Box marginTop="80px">
                    <ProfilePhoto size="150px" />
                    <Typography variant="h4">{data.UserID}</Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        width: "360px",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="h6">Username:</Typography>
                    <Typography variant="h6">{data.UserName}</Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        width: "360px",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="h6">Email:</Typography>
                    <Typography variant="h6">{data.Email}</Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        width: "360px",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="h6">Phone Number:</Typography>
                    <Typography variant="h6">{data.PhoneNumber}</Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        width: "360px",
                        justifyContent: "space-between",
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={() => history.push(`/user/profile/edit`)}
                    >
                        Edit Profile
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => history.push(`/user/profile/reset`)}
                    >
                        Change Password
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

const Profile = () => {
    let { path } = useRouteMatch();

    return (
        <Box
            sx={{
                height: "100vh",
                display: "grid",
                gridTemplateColumns: "auto",
                gap: 0,
                gridTemplateRows: "60px auto",
                gridTemplateAreas: `"header header header header""main main main main "`,
            }}
        >
            <Nav />
            <Switch>
                <Route path={[`${path}/reset`]}>
                    <Reset />
                </Route>
                <Route path={`${path}/edit`}>
                    <Edit />
                </Route>
                <Route exact path={path}>
                    <Detail />
                </Route>
            </Switch>
        </Box>
    );
};

const Login = () => {
    let history = useHistory();
    const [user, setUser] = useState({ userId: "", password: "" });

    const onChangeHandler = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const OnSubmitHandler = (e) => {
        e.preventDefault();

        console.log(user);
        loginUser(user).then((data) => {
            if (data !== undefined) {
                history.push("/contact");
            }else {
                alert(data);
            }
        });
    };

    return (
        <div className="login-bg">
            <div className="login-form">
                <Logo />
                <input
                    name="userId"
                    type="text"
                    placeholder="username"
                    onChange={onChangeHandler}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    onChange={onChangeHandler}
                />
                <div className="login-buttons">
                    <button onClick={() => history.push(`/user/register`)}>
                        register
                    </button>
                    <button type="submit" onClick={OnSubmitHandler}>
                        login
                    </button>
                </div>
                <a href="/user/forget/checkId">forget password?</a>
            </div>
        </div>
    );
};

const Register = () => {
    let history = useHistory();
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [questionCode, setQuestionCode] = useState(0);
    const [answer, setAnswer] = useState("");

    let questions = [];
    const { data } = GetRegister();
    if (data && data.questions) {
        questions = data.questions;
    }

    const handleRegister = () => {
        if (
            username.length === 0 ||
            password.length === 0 ||
            confirmPassword.length === 0 ||
            answer.length === 0
        ) {
            return;
        }
        if (password !== confirmPassword) {
            return;
        }
        registerUser({
            userId: username,
            password,
            username: name,
            securityQuestion: questionCode,
            securityAnswer: answer,
        }).then((data) => {
            if (data !== undefined) {
                history.push("/user/login");
            }
        });
    };

    return (
        <div className="login-bg">
            <div className="login-form">
                <Logo />
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <select
                    placeholder="security question"
                    value={questionCode}
                    onChange={(e) => {
                        setQuestionCode(e.target.value);
                    }}
                >
                    {questions.map(({ Code, Question }) => (
                        <option value={Code}>{Question}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="answer"
                    value={answer}
                    onChange={(e) => {
                        setAnswer(e.target.value);
                    }}
                />
                <div className="login-buttons">
                    <button onClick={() => history.goBack()}>cancel</button>
                    <button onClick={handleRegister}>confirm</button>
                </div>
            </div>
        </div>
    );
};

const Forget = () => {
    let { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={[`${path}/checkId`]}>
                <CheckId />
            </Route>
            <Route path={`${path}/verify`}>
                <VerifyAns />
            </Route>
        </Switch>
    );
};

const CheckId = () => {
    let history = useHistory();
    const [securityQuestion, setSecurityQuestion] = useState(null);
    const [step, setStep] = useState(0);
    const { handleSubmit, control } = useForm({
        defaultValues: {
            UserId: "",
        },
    });

    const onSubmitHandler = (data) => {
        // send data to server to verify userId

        // if exist, go to next
        history.push(`/user/forget/verify`);
    };

    return (
        <Box
            bgcolor="primary.light"
            sx={{
                margin: 0,
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Box>
                    <Box>
                        <Typography variant="h6">Reset Password</Typography>
                        <Typography variant="caption">
                            Please enter your userId
                        </Typography>
                    </Box>
                    <InputField
                        control={control}
                        name="UserId"
                        label="UserId"
                    />
                    <Button
                        type="button"
                        sx={{ float: "right", marginTop: "20px" }}
                        onClick={() => history.goBack()}
                    >
                        cancel
                    </Button>
                    <Button
                        type="submit"
                        sx={{ float: "right", marginTop: "20px" }}
                    >
                        next
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

const VerifyAns = () => {
    let history = useHistory();
    const [securityQuestion, setSecurityQuestion] = useState(null);
    const [step, setStep] = useState(0);
    const { handleSubmit, control } = useForm({
        defaultValues: {
            UserId: "",
        },
    });

    const onSubmitHandler = (data) => {
        // send data to server to verify userId

        // if exist, go to next
        history.push(`/user/forget/verify`);
    };

    return (
        <Box
            bgcolor="primary.light"
            sx={{
                margin: 0,
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Box>
                    <Typography variant="h6">Reset Password</Typography>
                    <Typography variant="body1">
                        Security Question: {securityQuestion}
                    </Typography>
                    <InputField control={control} name="sa" label="Answer" />
                    <InputField
                        control={control}
                        name="np"
                        label="New Password"
                        type="password"
                    />
                    <InputField
                        control={control}
                        name="cp"
                        label="Confirm Password"
                        type="password"
                    />
                    <Box
                        sx={{
                            display: "flex",
                            width: "360px",
                            justifyContent: "space-between",
                            marginTop: "20px",
                        }}
                    >
                        <Button type="button" onClick={() => history.goBack()}>
                            cancel
                        </Button>
                        <Button type="submit">confirm</Button>
                    </Box>
                </Box>
            </form>
        </Box>
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
