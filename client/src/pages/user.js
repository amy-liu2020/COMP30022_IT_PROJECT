import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import NavigationBar from "../common/nav";
import Logo from "../common/logo";
import Setting from "../common/setting";
import {
    LoginUser,
    GetRegister,
    RegisterUser,
    Getprofile,
    uploadPhoto,
    GetPhoto,
    changeDetails,
    changePassword,
} from "../api";
import { useState } from "react";
import ProfilePhoto from "../common/avatar";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CenterBox } from "../common/layout";
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

const Reset = () => {
    let history = useHistory();

    const [oldpassword, setOldpassword] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");

    const handleSave = async () => {
        if (newpassword !== confirmpassword) {
            return;
        }
        if (oldpassword === newpassword) {
            return;
        }
        await changePassword({ op: oldpassword, np: newpassword });
        localStorage.clear();
        history.push("/");
    };

    return (
        <div className="container">
            <div className="container">
                <div className="forget-form">
                    <span>PASSWORD AUTHENTICATION</span>
                    <div className="input">
                        <label>Old Password</label>
                        <input
                            type="password"
                            placeholder=""
                            value={oldpassword}
                            onChange={(e) => {
                                setOldpassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className="input">
                        <label>New Password</label>
                        <input
                            type="password"
                            placeholder=""
                            value={newpassword}
                            onChange={(e) => {
                                setNewpassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className="input">
                        <label>Verify</label>
                        <input
                            type="password"
                            placeholder=""
                            value={confirmpassword}
                            onChange={(e) => {
                                setConfirmpassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className="buttons">
                        <button onClick={handleSave}>save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Edit = () => {
    let history = useHistory();
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const { data: photo } = GetPhoto();
    const { data, loading } = Getprofile();

    const handleSave = async () => {
        changeDetails({ phoneNumber: phone, Email: email });
        history.push(`/user/profile`);
    };

    const handleSubmit = () => {
        const file = document.getElementById("photoupload").files[0];
        if (file.size > 0) {
            const formData = new FormData();
            formData.append("file", file);
            uploadPhoto(formData);
        }
    };

    return (
        <div className="container">
            {loading ? (
                <span>{loading}</span>
            ) : (
                <div className="profile">
                    <div className="info">
                        <div className="avatar">
                            <img
                                style={{ width: "100%", height: "100%" }}
                                alt="avatar"
                                src={
                                    photo &&
                                    photo.photo &&
                                    "data:;base64," + photo.photo
                                }
                            />
                        </div>
                        <label>
                            photo:{" "}
                            <input id="photoupload" type="file" name="photo" />
                            <button onClick={handleSubmit}>submit</button>
                        </label>
                        <div className="avatar"></div>
                        <span>{data.UserID}</span>
                    </div>
                    <div className="label">
                        <label>USERNAME</label>
                        <span>{data.UserName}</span>
                    </div>
                    <div className="label">
                        <label>EMAIL</label>
                        <input
                            type="text"
                            placeholder=""
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div className="label">
                        <label>PHONE NO</label>
                        <input
                            type="text"
                            placeholder=""
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                        />
                    </div>
                    <div className="buttons">
                        <button onClick={handleSave}>Save</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const Detail = () => {
    let history = useHistory();
    const { data, loading, error } = Getprofile();

    return (
        <div className="container">
            {loading ? (
                <span>{loading}</span>
            ) : (
                <div className="profile">
                    <div className="info">
                        <ProfilePhoto size="100px" />
                        <span>{data.UserID}</span>
                    </div>
                    <div className="label">
                        <label>USERNAME</label>
                        <span>{data.UserName}</span>
                    </div>
                    <div className="label">
                        <label>EMAIL</label>
                        <span>{data.Email}</span>
                    </div>
                    <div className="label">
                        <label>PHONE NO</label>
                        <span>{data.PhoneNumber}</span>
                    </div>
                    <div className="buttons">
                        <button
                            onClick={() => history.push(`/user/profile/edit`)}
                        >
                            Edit my info
                        </button>
                        <button
                            onClick={() => history.push(`/user/profile/reset`)}
                        >
                            Change Password
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const Profile = () => {
    let { path } = useRouteMatch();

    return (
        <div>
            <NavigationBar />
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
        </div>
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
        securityQuestion: yup.number().required(),
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
            securityQuestion: 0,
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
                    render={({ field }) => (
                        <Select
                            SelectDisplayProps={{
                                style: { backgroundColor: "white" },
                            }}
                            {...field}
                            sx={{ marginBottom: "20px" }}
                        >
                            {data.map((que) => (
                                    <MenuItem key={que.Code} value={que.Code}>
                                        {que.Question}
                                    </MenuItem>
                                ))}
                        </Select>
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
    let { path } = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route path={[`${path}/checkId`]}>
                    <CheckId />
                </Route>
                <Route path={`${path}/verify`}>
                    <VerifyAns />
                </Route>
            </Switch>
        </div>
    );
};

const CheckId = () => {
    let history = useHistory();
    return (
        <div>
            <NavigationBar />
            <div class="container">
                <div class="forget-form">
                    <span>Reset Password</span>
                    <div class="input">
                        <label>username</label>
                        <input type="text" placeholder="username" />
                    </div>
                    <div class="buttons">
                        <button
                            onClick={() => history.push(`/user/forget/verify`)}
                        >
                            next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const VerifyAns = () => {
    let history = useHistory();
    return (
        <div>
            <NavigationBar />
            <div class="container">
                <div class="forget-form">
                    <span>Reset Password</span>
                    <div class="input">
                        <label>security question</label>
                        <select placeholder="security question">
                            <option>How old are you?</option>
                        </select>
                    </div>
                    <div class="input">
                        <label>answer</label>
                        <input type="text" placeholder="password" />
                    </div>
                    <div class="input">
                        <label>new password</label>
                        <input type="password" placeholder="password" />
                    </div>
                    <div class="input">
                        <label>password</label>
                        <input type="password" placeholder="password" />
                    </div>
                    <div class="buttons">
                        <button onClick={() => history.push(`/user/profile`)}>
                            save
                        </button>
                    </div>
                </div>
            </div>
        </div>
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
