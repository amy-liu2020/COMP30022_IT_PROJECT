import './App.css';
import { Contact } from './components/Contact';
import { Meeting } from './components/Meeting';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// const Test = () => {
// 	const [selectedFile, setSelectedFile] = useState();
	
//   // toggle when selected file changed
//   const onChangeHandler = (e) => {
//     setSelectedFile(e.target.files[0]);
//   }

//   const onSubmit = () => {
//     const data = new FormData() 
//     data.append('file', selectedFile);
//     console.warn(selectedFile);
//     let url = "api/upload";

//     axios.post(url, data, { // receive two parameter endpoint url ,form data 
//     })
//     .then(res => { // then print response status
//         console.warn(res);
//     })
//   }

//   return (
//   <div>
//     <p>Login page</p>
//     <input type="file" onChange={onChangeHandler}/>
//     <button type="submit" onClick={onSubmit}>submit</button>
//   </div>)

// }

// const Login = () => {

//   const [user, setUser] = useState([]);

//   const onChangeHandler = (e) => {
//     setUser((prev) => ({...prev, [e.target.name] : e.target.value}));
//   }

//   const onSubmitHandler = (e) => {
//     e.preventDefault();
//     axios.post('/login', user)
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   }

//   return (
//       <form>
//           <input type="text" name="userId" onChange={onChangeHandler} value={user.userId}/>
//           <input type="password" name="password" onChange={onChangeHandler} value={user.password}/>
//           <button type="submit" onClick={onSubmitHandler}>submit</button>
//       </form>
//   )
// }

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/contact"><Contact/></Route>
        <Route path="/meeting"><Meeting/></Route>
        <Route exact path="/"><p>login page</p></Route>
        <Route path="/"><p>404 not found</p></Route>
      </Switch>
    </Router>
  );
}

export default App;
