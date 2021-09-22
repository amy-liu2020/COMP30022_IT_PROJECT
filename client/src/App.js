import './App.css';
//import { Contact } from './components/Contact';
//import { Meeting } from './components/Meeting';
// import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
// import { Login } from './components/Login';
import { useState } from 'react';
import axios from 'axios';

// const Contact = () => {
//   return (
//   <div>
//     <p>Contact page</p>
//   </div>)
// }

// const Meeting = () => {
//   return (
//   <div>
//     <p>Meeting page</p>
//   </div>)
// }

const Test = () => {
	const [selectedFile, setSelectedFile] = useState();
	
  // toggle when selected file changed
  const onChangeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const onSubmit = () => {
    const data = new FormData() 
    data.append('file', selectedFile);
    console.warn(selectedFile);
    let url = "api/uploadPhoto";

    axios.post(url, data, { // receive two parameter endpoint url ,form data 
    })
    .then(res => { // then print response status
        console.warn(res);
    })
  }

  return (
  <div>
    <p>Login page</p>
    <input type="file" onChange={onChangeHandler}/>
    <button type="submit" onClick={onSubmit}>submit</button>
  </div>)

}

function App() {

  return (
    // <Router>
    //   <Link to="/">home</Link>
    //   <hr/>
    //   <Link to="/login">login</Link>
    //   <hr/>
    //   <Link to="/contact">contact</Link>
    //   <hr/>
    //   <Link to="/meeting">meeting</Link>
    //   <hr/>
    //   <Link to="/meeting">meeting</Link>
    //   <Switch>
    //     <Route path="/contact"><Contact/></Route>
    //     <Route path="/meeting"><Meeting/></Route>
    //     <Route path="/login"><Login/></Route>
    //     <Route path="/"><p>home page</p></Route>
    //   </Switch>
    // </Router>
    <Test/>
  );
}

export default App;
