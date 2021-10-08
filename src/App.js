
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import Header from './components/Header/Header';
import Home from "./components/Home/Home";
import SignUp from "./components/Register/Register";

function App() {
 
  return (
    <div className="App">
      
      <Router>
      <Header></Header>
        <Switch>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route path='/signup'>
          <SignUp></SignUp>
          </Route>
          <Route path='/resetPassword'>
            <ForgetPassword></ForgetPassword>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
