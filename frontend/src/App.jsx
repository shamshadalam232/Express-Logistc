
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Track from './pages/Track';
import CheckStatus from './pages/CheckStatus';
import About from './pages/About';
import Navbar from "./Navbar.jsx";
import Modal from "./components/Modal";
import JoinForm from "./components/JoinForm";
import { useState } from "react";
import Footer from "./Footer.jsx"
import AdminApplications from "./admin/AdminApplication.jsx";
import AdminShipments from "./admin/AdminShipment.jsx";
import StatusDashboard from "./pages/StatusDashboard.jsx";
//import './App.css'

function App() {
 
  const[open, setOpen] = useState(false);

  return (
    <BrowserRouter>
    <Navbar onOpenJoin={() => setOpen(true)} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <JoinForm onClose={() => setOpen(false)} />
      </Modal>
      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/track" element={<Track />} />
        <Route path="/status" element={<CheckStatus />} />
        <Route path="/about" element={<About />} />
        <Route path="/status/dashboard" element={<StatusDashboard />} />
        {/* ADMIN (Hidden) */}
        <Route path="/admin/applications" element={< AdminApplications />} />
        <Route path="/admin/shipments" element={< AdminShipments /> } />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
