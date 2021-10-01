import { useHistory } from "react-router-dom";
import { NavigationBar } from "./NavigationBar";
import { loginUser, registerUser } from "./api";
import { useState } from "react";

const Logo = () => {
  return (
      <svg className="login-logo" viewBox="166.125 209.984 62.563 29.219" xmlns="http://www.w3.org/2000/svg">
          <path d="M 166.455 218.137 L 166.455 217.727 L 172.865 217.727 C 175.058 217.727 176.692 218.044 177.765 218.677 C 178.838 219.31 179.375 220.44 179.375 222.067 C 179.375 223.867 178.722 225.11 177.415 225.797 C 176.195 226.417 174.488 226.727 172.295 226.727 L 172.125 226.727 L 172.125 232.577 L 174.845 232.577 L 174.845 232.987 L 166.455 232.987 L 166.455 232.577 L 167.865 232.577 L 167.865 218.137 L 166.455 218.137 Z M 172.705 218.137 L 172.125 218.137 L 172.125 226.317 L 172.575 226.317 C 173.448 226.317 174.052 226.02 174.385 225.427 C 174.718 224.827 174.885 223.86 174.885 222.527 L 174.885 221.477 C 174.885 220.244 174.728 219.38 174.415 218.887 C 174.108 218.387 173.538 218.137 172.705 218.137 ZM 188.446 217.927 C 186.193 217.927 185.066 220.097 185.066 224.437 L 185.066 226.167 C 185.066 228.227 185.363 229.844 185.956 231.017 C 186.556 232.184 187.436 232.767 188.596 232.767 C 190.196 232.767 191.666 231.214 193.006 228.107 L 193.396 228.107 L 193.246 232.967 L 193.006 232.967 C 192.92 232.807 192.84 232.694 192.766 232.627 C 192.693 232.56 192.586 232.527 192.446 232.527 C 192.306 232.527 191.78 232.64 190.866 232.867 C 189.953 233.094 189.023 233.207 188.076 233.207 C 185.71 233.207 183.873 232.567 182.566 231.287 C 181.266 230.007 180.616 228.084 180.616 225.517 C 180.616 222.957 181.296 220.977 182.656 219.577 C 184.016 218.184 185.843 217.487 188.136 217.487 C 189.023 217.487 189.893 217.6 190.746 217.827 C 191.6 218.054 192.096 218.167 192.236 218.167 C 192.383 218.167 192.493 218.134 192.566 218.067 C 192.64 218 192.72 217.887 192.806 217.727 L 193.046 217.727 L 193.216 222.457 L 192.826 222.457 C 192.173 220.99 191.503 219.867 190.816 219.087 C 190.123 218.314 189.333 217.927 188.446 217.927 ZM 201.916 225.267 L 200.766 225.267 L 200.766 232.577 L 202.176 232.577 L 202.176 232.987 L 195.096 232.987 L 195.096 232.577 L 196.506 232.577 L 196.506 218.137 L 195.096 218.137 L 195.096 217.727 L 201.676 217.727 C 203.563 217.727 204.903 217.824 205.696 218.017 C 206.489 218.217 207.046 218.454 207.366 218.727 C 208.066 219.294 208.416 220.197 208.416 221.437 C 208.416 222.67 208.109 223.55 207.496 224.077 C 206.889 224.61 205.959 224.927 204.706 225.027 L 204.706 225.097 C 205.886 225.257 206.706 225.604 207.166 226.137 C 207.633 226.677 207.866 227.58 207.866 228.847 L 207.866 229.997 C 207.866 230.757 207.906 231.267 207.986 231.527 C 208.066 231.787 208.236 231.917 208.496 231.917 C 208.763 231.917 208.973 231.797 209.126 231.557 C 209.273 231.317 209.413 230.814 209.546 230.047 L 209.916 230.087 C 209.756 231.32 209.476 232.15 209.076 232.577 C 208.676 232.997 207.879 233.207 206.686 233.207 C 205.499 233.207 204.653 232.927 204.146 232.367 C 203.646 231.807 203.396 230.757 203.396 229.217 L 203.396 227.627 C 203.396 226.814 203.293 226.217 203.086 225.837 C 202.873 225.457 202.483 225.267 201.916 225.267 Z M 201.476 218.137 L 200.766 218.137 L 200.766 224.857 L 201.456 224.857 C 202.289 224.857 202.903 224.604 203.296 224.097 C 203.696 223.584 203.896 222.754 203.896 221.607 L 203.896 220.977 C 203.896 219.83 203.706 219.07 203.326 218.697 C 202.939 218.324 202.323 218.137 201.476 218.137 ZM 219.703 228.957 L 222.323 217.727 L 228.143 217.727 L 228.143 218.137 L 226.943 218.137 L 226.943 232.577 L 228.143 232.577 L 228.143 232.987 L 221.493 232.987 L 221.493 232.577 L 222.693 232.577 L 222.693 218.947 L 222.603 218.947 L 219.333 232.987 L 216.603 232.987 L 212.773 218.887 L 212.683 218.887 L 212.683 232.577 L 213.883 232.577 L 213.883 232.987 L 210.923 232.987 L 210.923 232.577 L 212.113 232.577 L 212.113 218.137 L 210.923 218.137 L 210.923 217.727 L 216.803 217.727 L 219.703 228.957 Z" 
          transform={"matrix(1, 0, 0, 1, 0, 0)"} />
      </svg>
  )
}

export const Login = () => {
  let history = useHistory();
  const [user, setUser] = useState({userId: "", password: ""});

  const onChangeHandler = (e) => {
    setUser((prev) => ({...prev, [e.target.name] : e.target.value}))
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log(user);
    loginUser(user);
  }

  return (
    <div className="login-bg">
      <div className="login-form">
        <Logo></Logo>
        <input name="userId" type="text" placeholder="username" onChange={onChangeHandler}/>
        <input name="password" type="password" placeholder="password" onChange={onChangeHandler}/>
        <div className="login-buttons">
          <button onClick={() => history.push(`/register`)}>register</button>
          <button type="submit" onClick={onSubmitHandler}>login</button>
        </div>
        <a href="/forget">forget password?</a>
      </div>
    </div>
  )
}

export const Register = () => {
  let history = useHistory();

  return (
    <div className="login-bg">
      <div className="login-form">
        <Logo></Logo>
        <input type="text" placeholder="username"/>
        <input type="password" placeholder="password"/>
        <input type="password" placeholder="confirm password"/>
        <select placeholder="security question">
          <option>How old are you?</option>
        </select>
        <input type="text" placeholder="answer"/>
        <div className="login-buttons">
          <button onClick={() => history.push(`/`)}>cancel</button>
          <button onClick={() => history.push(`/`)}>confirm</button>
        </div>
      </div>
    </div>
  )
}

export const Forget = () => {
  let history = useHistory();
  return (
    <div>
      <NavigationBar/>
      <div class="container">
        <div class="forget-form">
          <span>Reset Password</span>
          <div class="input">
            <label>username</label>
            <input type="text" placeholder="username"/>
          </div>
          <div class="buttons">
            <button onClick={() => history.push(`/fgpassword`)}>next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ForgetInputPassword = () => {
  let history = useHistory();
  return (
    <div>
      <NavigationBar/>
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
            <input type="text" placeholder="password"/>
          </div>
          <div class="input">
            <label>new password</label>
            <input type="password" placeholder="password"/>
          </div>
          <div class="input">
            <label>password</label>
            <input type="password" placeholder="password"/>
          </div>
          <div class="buttons">
            <button onClick={() => history.push(`/profile`)}>save</button>
          </div>
        </div>
      </div>
    </div>
  )
}
