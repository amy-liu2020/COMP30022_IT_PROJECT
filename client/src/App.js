import './App.css';
import { Contact } from './components/Contact';
import { Meeting } from './components/Meeting';
import { Profile } from './components/Profile';
import { Setting } from './components/Setting';
import { Login, Register, Forget, ForgetInputPassword } from './components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// const Test = () => {
//   const { register, formState: { errors }, handleSubmit } = useForm({
//     criteriaMode: 'all',
//   });
//   const onSubmit = data => console.log(data);
   
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input name="userId" placeholder="userId" defaultValue="admin" {...register("userId", { 
//         required: "userId is required", 
//         maxLength: {value: 16, message: "userId is too long"},
//         minLength: {value: 8, message: "userId is too short"},})}/>
//         {errors.userId && <p className="error">error</p>}

//       <input type="password" placeholder="password" /><br/>
//       <button type="submit">login</button>
//     </form>
//   );
// }

function App() {
  // const contact = {
  //   AccountID: "",
  //   Company: "",
  //   Email: "",
  //   FullName: "",
  //   Home: "",
  //   JobTitle: "",
  //   Notes: "",
  //   PhoneNumber: "",
  //   Tags: []
  // }

  // const Demo = () => {
  //   for (const [key, value] of Object.entries(contact)) {
  //     console.log(`${key}: ${value}`);
  //   }
  // }

  // useEffect(Demo);

  return (
    <Router>
      <Switch>
        <Route path="/contact"><Contact/></Route>
        <Route path="/meeting"><Meeting/></Route>
        <Route path='/profile' component={Profile}></Route>
        <Route path='/register' component={Register}></Route>
        <Route path='/fgpassword' component={ForgetInputPassword}></Route>
        <Route path='/forget' component={Forget}></Route>
        <Route exact path='/' component={Login}></Route>
        <Route path="/setting"><Setting/></Route>
        <Route path="/"><p>404 not found</p></Route>
      </Switch>
    </Router>
  );
}

export default App;