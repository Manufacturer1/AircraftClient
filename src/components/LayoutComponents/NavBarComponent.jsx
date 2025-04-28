import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, UserCircle } from "lucide-react";
import LoginModal from "./loginModalComponent";
import { useAuth } from "../../context/authContext";
import logo from "../../images/logo.svg";
import globIcon from "../../images/globe.png";
import NotificationDropDown from "./notificationDropDown";
import { usePassenger } from "../../context/passengerContext";
import CurrencyDropdown from "./currencyDropDown";

const NavBar = () => {
  const [openLoginModal, setLoginModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { isAuthenticated, user, logout } = useAuth();
  const { notifications } = usePassenger();

  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const handleCurrencyChange = (currencyCode) => {
    setSelectedCurrency(currencyCode);
    // Here you would typically call an API to update the currency preference
    // or dispatch an action to your state management
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY <= 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full px-16 bg-white shadow-sm transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Logo" className="h-8" />
            <Link
              to="/"
              className="font-sarabun text-[20px] font-normal text-[#6C6CFFFF] hover:text-[#4a4aff] transition-colors"
            >
              E-flight
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <CurrencyDropdown
              selectedCurrency={selectedCurrency}
              onCurrencyChange={handleCurrencyChange}
            />
            <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
              <img className="w-5 h-5" src={globIcon} alt="Language" />
            </button>

            <NotificationDropDown
              showNotifications={showNotifications}
              setShowNotifications={setShowNotifications}
              notifications={notifications}
            />

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-[#CEFBEDFF] rounded-full">
                    <UserCircle className="text-[#0A7956FF]" size={20} />
                  </div>
                  <p className="text-sm font-medium text-neutral-900 leading-tight">
                    {user?.fullName || "User"}
                  </p>
                  <ChevronDown
                    className={`text-gray-500 transition-transform ${
                      showUserMenu ? "rotate-180" : ""
                    }`}
                    size={16}
                  />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/bookings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Bookings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setLoginModalOpen(true)}
                className="flex items-center justify-center w-24 h-9 text-[#0A7956FF] 
                  bg-[#CEFBEDFF] rounded-[8px] text-[15px] font-medium
                  hover:bg-[#92F6D7FF] hover:active:bg-[#56F1C0FF]
                  transition-all duration-200"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      <LoginModal setModalOpen={setLoginModalOpen} openModal={openLoginModal} />
    </>
  );
};

export default NavBar;
