import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
// import { BrowserRouter as Routes, Route } from "react-router-dom";
import { BrowserRouter , Route, Routes   } from "react-router-dom";
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
function App() {
  return (
    <div className="App">
      <Navbar/>
     <BrowserRouter>
     <Routes>
        <Route path="/home" exact element={<Homescreen/>}/>
        <Route path="/book/:roomId/:fromDate/:toDate" exact element={<Bookingscreen/>}/>
         <Route path="/register" exact element={<RegisterScreen/>}/>
         <Route path="/login" exact element={<LoginScreen/>}/>
         <Route path="/profile" exact element={<ProfileScreen/>}/>

     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
