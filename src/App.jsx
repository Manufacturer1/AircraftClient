import NavBar from "./components/LayoutComponents/NavBarComponent";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/LayoutComponents/footerComponent";
import FlightList from "./pages/flightListing.jsx";
import BookingPage from "./pages/bookingPage.jsx";
import { AuthProvider } from "./context/authContext.jsx";

function App() {
  return (
    <AuthProvider>
      {/* Wrap everything with AuthProvider */}
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Navbar */}
          <div className="navbar px-20 py-5 shadow-sm z-10">
            <NavBar />
          </div>

          <div className="content flex-1 mt-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/flights" element={<FlightList />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          <div className="footer py-14 px-32 bg-[#F8F9FAFF]">
            <Footer />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
