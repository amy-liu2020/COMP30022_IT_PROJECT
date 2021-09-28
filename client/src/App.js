import './App.css';
import { Contact } from './components/Contact';
import { Meeting } from './components/Meeting';
import { Profile } from './components/Profile';
import { Login, Register, Forget, ForgetInputPassword } from './components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { useEffect } from "react/cjs/react.development";

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

// const TestHtml = () => {
//   return (
//     <div>
//       <form style={{display: 'flex'}}>
//         <label htmlFor="username">username</label>
//         <input name="username" type="text" defaultValue="admin" minLength="8" maxLength="16" ></input><br/>
//         <label htmlFor="age">age</label>
//         <input name="age" type="number" required/><br/>
//         <label htmlFor="mNum">phone number</label>
//         <input name="mNum" type="tel" required/><br/>
//         <label htmlFor="email">email</label>
//         <input name="email" type="email" required/>
//         <button type="submit">submit</button>
//       </form>
//     </div>
//   )
// }

/**      <ErrorMessage
        errors={errors}
        name="userId"
        render={({ messages }) => {
          return messages 
            ? Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            : null;
        }}
      /> */


      
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
        <Route path="/"><p>404 not found</p></Route>
      </Switch>
    </Router>
    //<TestHtml/>
    // <div>
    //   <p>hello world</p>
    // </div>
  );
}

export default App;