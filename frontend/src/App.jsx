import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import Community from "./pages/Community";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard"
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Help from "./pages/Help";
import Login from "./pages/Login";
import RoutePage from "./pages/RoutePage";
import Station from "./pages/Station";
import StationPage from "./pages/StationPage";
import StationTrainsPage from "./pages/StationTrainPage";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/book" element={<div>Book Page</div>} />
        <Route path="/manage" element={<div>Manage Page</div>} />
        <Route path="/experience" element={<div>Experience Page</div>} />
        <Route path="/destinations" element={<div>Destinations Page</div>} />
        <Route path="/loyalty" element={<div>Loyalty Page</div>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/community" element={<Community />} />
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/about" element={<About/>}/>
         <Route path="/faq" element={<FAQ/>}/>
         <Route path="/help" element={<Help/>}/>
        <Route path="/routepage" element={<RoutePage/>}/>
          {/* <Route path="/station/:id" element={<Station />} /> */}
           <Route path="/station/:stationCode" element={<StationPage />} />
           <Route
  path="/station/:stationCode/trains"
  element={<StationTrainsPage />}
/>
      </Routes>

      <Footer/>
    </BrowserRouter>
  );
}

export default App;
