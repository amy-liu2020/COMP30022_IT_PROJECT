import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { NavigationBar } from "./NavigationBar";

const Reset = () => {
  let history = useHistory();

  return (
    <div class="container">
      <div class="container">
        <div class="forget-form">
          <span>PASSWORD AUTHENTICATION</span>
          <div class="input">
            <label>Old Password</label>
            <input type="password" placeholder=""/>
          </div>
          <div class="input">
            <label>New Password</label>
            <input type="password" placeholder=""/>
          </div>
          <div class="input">
            <label>Verity</label>
            <input type="password" placeholder=""/>
          </div>
          <div class="buttons">
            <button onClick={() => history.push(`/profile`)}>save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

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
          <input type="text" placeholder=""/>
        </div>
        <div className="label">
          <label>PHONE NO</label>
          <input type="text" placeholder=""/>
        </div>
        <div className="buttons">
          <button onClick={() => history.push(`/profile`)}>Save</button>
        </div>
      </div>
    </div>
  )
}

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
          <button onClick={() => history.push(`/profile/edit`)}>Edit my info</button>
          <button onClick={() => history.push(`/profile/reset`)}>Change Password</button>
        </div>
      </div>
    </div>
  )
}

export const Profile = () => {

  let { path } = useRouteMatch();

  return (
    <div>
      <NavigationBar/>
      <Switch>
          <Route path={[`${path}/reset`]}>
              <Reset/>
          </Route>
          <Route path={`${path}/edit`}>
              <Edit/>
          </Route>
          <Route exact path={path}>
              <Detail/>
          </Route>
      </Switch>
    </div>
  )
}