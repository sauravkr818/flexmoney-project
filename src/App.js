
import './App.css';
import YogaClass from './components/yogapage.js';
import Signup from './components/signup.js';
import Login from './components/login.js';
import Dashboard from './components/dashboard.js';
import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";



function App() {
  return (
    <>
    
         <BrowserRouter>
      <Routes>
        <Route path="/" element={<YogaClass />} />
        <Route path="signup/*" element={<Signup />} />
        <Route path="login/*" element={<Login />} />
        <Route path="dashboard/*" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
         
    </>
  );
}

export default App;
