import './App.css';
import { Contact } from './components/Contact';
import { Meeting } from './components/Meeting';
import { Login, Register, Forget } from './components/Login';
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
//       <ErrorMessage
//         errors={errors}
//         name="userId"
//         render={({ messages }) => {
//           return messages 
//             ? Object.entries(messages).map(([type, message]) => (
//                 <p key={type}>{message}</p>
//               ))
//             : null;
//         }}
//       />

//       <input type="password" placeholder="password" /><br/>
//       <button type="submit">login</button>
//     </form>
//   );
// }


function App() {

  return (
    <Router>
      <Switch>
        <Route path="/contact"><Contact/></Route>
        <Route path="/meeting"><Meeting/></Route>
        <Route path='/register' component={Register}></Route>
        <Route path='/forget' component={Forget}></Route>
        <Route exact path='/' component={Login}></Route>
        <Route path="/"><p>404 not found</p></Route>
      </Switch>
    </Router>
  );
}

export default App;