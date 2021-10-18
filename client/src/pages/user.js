import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import NavigationBar from "../common/nav";
import Logo from "../common/logo";
import Setting from "../common/setting";
import { loginUser, GetRegister, registerUser, Getprofile, uploadPhoto, GetPhoto, changeDetails, changePassword } from "../api";
import { useState } from "react";

const Reset = () => {
    let history = useHistory();

    const [oldpassword, setOldpassword] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');

    const handleSave = async () => {
        changePassword({ oldpassword, newpassword, });
        history.push(`/user/profile`)
    }

    return (
        <div class="container">
            <div class="container">
                <div class="forget-form">
                    <span>PASSWORD AUTHENTICATION</span>
                    <div class="input">
                        <label>Old Password</label>
                        <input type="password" placeholder="" value={oldpassword} onChange={(e) => { setOldpassword(e.target.value) }} />
                    </div>
                    <div class="input">
                        <label>New Password</label>
                        <input type="password" placeholder="" value={newpassword} onChange={(e) => { setNewpassword(e.target.value) }} />
                    </div>
                    <div class="input">
                        <label>Verify</label>
                        <input type="password" placeholder="" value={confirmpassword} onChange={(e) => { setConfirmpassword(e.target.value) }} />
                    </div>
                    <div class="buttons">
                        <button onClick={handleSave}>
                            save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Edit = () => {
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('')
    const { data: photo } = GetPhoto();
    const { data, loading } = Getprofile();
    let info = {};
    if (data && data.info) {
        info = data.info
    }

    const handleSave = async () => {
        changeDetails({ phoneNumber: phone, Email: email });
        history.push(`/user/profile`)
    }

    const handleSubmit = () => {
        const file = document.getElementById('photoupload').files[0];
        if (file.size > 0) {
            const formData = new FormData();
            formData.append('file', file);
            uploadPhoto(formData);
        }
    }


    return (
        <div className="container">
            {loading ? <span>{loading}</span> : <div className="profile">
                <div className="info">
                    <div className="avatar"><img style={{ width: '100%', height: '100%' }} alt="avatar" src={photo && "data:;base64," + photo.photo} /></div>
                    <label>photo: <input id="photoupload" type="file" name="photo" />
                        <button onClick={handleSubmit}>submit</button>
                    </label>
                    <div className="avatar"></div>
                    <span>{info.UserID}</span>
                </div>
                <div className="label">
                    <label>USERNAME</label>
                    <span>{info.UserName}</span>
                </div>
                <div className="label">
                    <label>EMAIL</label>
                    <input type="text" placeholder="" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="label">
                    <label>PHONE NO</label>
                    <input type="text" placeholder="" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                </div>
                <div className="buttons">
                    <button onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>}
        </div>
    );
};

const Detail = () => {
    let history = useHistory();
    const { data: photo } = GetPhoto();
    const { data, loading } = Getprofile();
    let info = {};
    if (data && data.info) {
        info = data.info
    }

    return (
        <div className="container">
            {loading ? <span>{loading}</span> : <div className="profile">
                <div className="info">
                    <div className="avatar"><img style={{ width: '100%', height: '100%' }} alt="avatar" src={photo && "data:;base64," + photo.photo} /></div>
                    <span>{info.UserID}</span>
                </div>
                <div className="label">
                    <label>USERNAME</label>
                    <span>{info.UserName}</span>
                </div>
                <div className="label">
                    <label>EMAIL</label>
                    <span>{info.Email}</span>
                </div>
                <div className="label">
                    <label>PHONE NO</label>
                    <span>{info.PhoneNumber}</span>
                </div>
                <div className="buttons">
                    <button onClick={() => history.push(`/user/profile/edit`)}>
                        Edit my info
                    </button>
                    <button onClick={() => history.push(`/user/profile/reset`)}>
                        Change Password
                    </button>
                </div>
            </div>}
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
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [questionCode, setQuestionCode] = useState(0);
    const [answer, setAnswer] = useState('');

    let questions = [];
    const { data } = GetRegister();
    if (data && data.questions) {
        questions = data.questions;
    }

    const handleRegister = () => {
        if (username.length === 0 || password.length === 0 || confirmPassword.length === 0 || answer.length === 0) {
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
            securityAnswer: answer
        }).then((data) => {
            if (data !== undefined) {
                history.push("/user/login");
            }
        });
    }

    return (
        <div className="login-bg">
            <div className="login-form">
                <Logo />
                <input type="text" placeholder="username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                <input type="password" placeholder="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <input type="password" placeholder="confirm password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                <input type="text" placeholder="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                <select placeholder="security question" value={questionCode} onChange={(e) => { setQuestionCode(e.target.value) }}>
                    {questions.map(({ Code, Question }) => (
                        <option value={Code}>{Question}</option>
                    ))}
                </select>
                <input type="text" placeholder="answer" value={answer} onChange={(e) => { setAnswer(e.target.value) }} />
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
