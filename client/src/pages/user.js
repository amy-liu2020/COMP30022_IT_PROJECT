import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import NavigationBar from "../common/nav";
import Logo from "../common/logo";
import Setting from "../common/setting"
import { loginUser } from "../api";
import { useState } from "react";

const Reset = () => {
    let history = useHistory();

    return (
        <div class="container">
            <div class="container">
                <div class="forget-form">
                    <span>PASSWORD AUTHENTICATION</span>
                    <div class="input">
                        <label>Old Password</label>
                        <input type="password" placeholder="" />
                    </div>
                    <div class="input">
                        <label>New Password</label>
                        <input type="password" placeholder="" />
                    </div>
                    <div class="input">
                        <label>Verify</label>
                        <input type="password" placeholder="" />
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

const Edit = () => {
    let history = useHistory();

    return (
        <div className="container">
            <div className="profile">
                <div className="info">
                    <div className="avatar"></div>
                    <span>Amy Liu</span>
                </div>
                <div className="label">
                    <label>USERNAME</label>
                    <span>AMYLI201</span>
                </div>
                <div className="label">
                    <label>EMAIL</label>
                    <input type="text" placeholder="" />
                </div>
                <div className="label">
                    <label>PHONE NO</label>
                    <input type="text" placeholder="" />
                </div>
                <div className="buttons">
                    <button onClick={() => history.push(`/user/profile`)}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

const Detail = () => {
    let history = useHistory();

    return (
        <div className="container">
            <div className="profile">
                <div className="info">
                    <div className="avatar"></div>
                    <span>Amy Liu</span>
                </div>
                <div className="label">
                    <label>USERNAME</label>
                    <span>AMYLI201</span>
                </div>
                <div className="label">
                    <label>EMAIL</label>
                    <span>amytest2@student.edu.au</span>
                </div>
                <div className="label">
                    <label>PHONE NO</label>
                    <span>****3882</span>
                </div>
                <div className="buttons">
                    <button onClick={() => history.push(`/user/profile/edit`)}>
                        Edit my info
                    </button>
                    <button onClick={() => history.push(`/user/profile/reset`)}>
                        Change Password
                    </button>
                </div>
            </div>
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

    const onSubmitHandler = (e) => {
        e.preventDefault();

        console.log(user);
        loginUser(user).then((value) => {
            value.status == 200 ? history.push("/contact") : alert(value.msg);
        });
    };

    return (
        <div className="login-bg">
            <div className="login-form">
                <Logo/>
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
                    <button type="submit" onClick={onSubmitHandler}>
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

    return (
        <div className="login-bg">
            <div className="login-form">
                <Logo />
                <input type="text" placeholder="username" />
                <input type="password" placeholder="password" />
                <input type="password" placeholder="confirm password" />
                <select placeholder="security question">
                    <option>How old are you?</option>
                </select>
                <input type="text" placeholder="answer" />
                <div className="login-buttons">
                    <button onClick={() => history.goBack()}>cancel</button>
                    <button onClick={() => history.goBack()}>confirm</button>
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
                    <CheckId/>
                </Route>
                <Route path={`${path}/verify`}>
                    <VerifyAns/>
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
                        <button onClick={() => history.push(`/user/forget/verify`)}>
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
                <Login/>
            </Route>
            <Route path={`${path}/register`}>
                <Register/>
            </Route>
            <Route path={`${path}/profile`}>
                <Profile />
            </Route>
            <Route path={`${path}/setting`}>
                <Setting/>
            </Route>
            <Route path={`${path}/forget`}>
                <Forget />
            </Route>
        </Switch>
    );
};

export default User;
