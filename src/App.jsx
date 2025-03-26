import NavBar from "./components/NavBarComponent";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/footerComponent";
import FlightList from "./pages/flightListing.jsx";
import BookingPage from "./pages/bookingPage.jsx";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen ">
        {/* Navbar */}
        <div className="navbar px-20 py-5 shadow-sm ">
          <NavBar />
        </div>

        <div className="content flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flights" element={<FlightList />} />
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
        </div>

        <div className="footer py-14 px-32 bg-[#F8F9FAFF] ">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
