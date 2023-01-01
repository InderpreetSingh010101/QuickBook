import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter , Route, Routes   } from "react-router-dom";
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
function App() {
  return (
    <div className="App">
      <Navbar/>
     <BrowserRouter>
     <Routes>
        <Route path="/home" exact element={<Homescreen/>}/>
         <Route path="/book/:roomId" exact element={<Bookingscreen/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
