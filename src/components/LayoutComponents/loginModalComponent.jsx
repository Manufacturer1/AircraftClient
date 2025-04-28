import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { registerUser, loginUser } from "../../services/authService";
import { useAuth } from "../../context/authContext";
import { usePassenger } from "../../context/passengerContext";

const LoginModal = ({ openModal, setModalOpen }) => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const modalRef = useRef(null);

  const { setPassengerEmail } = usePassenger();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalOpen(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      let response;
      if (isLogin) {
        response = await loginUser({
          email: formData.email,
          password: formData.password,
        });
        login(response.token);
        console.log("Login success:", response);
        setModalOpen(false);

        setPassengerEmail(formData.email);
        setFormData({ fullName: "", email: "", password: "" });
      } else {
        response = await registerUser({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        });

        console.log("Registration success:", response);
        setSuccessMessage("Registration successful! Please login.");
        setIsLogin(true);
        setFormData({ ...formData, password: "" });
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
      setFormData({ fullName: "", email: "", password: "" });
      setSuccessMessage("");
      setError("");
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);

  return (
    <AnimatePresence>
      {openModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-20 bg-neutral-900"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.1 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-0 z-20 flex items-center justify-center p-4"
          >
            <div
              ref={modalRef}
              className="relative w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>

              <form onSubmit={handleSubmit} className="py-10 px-6">
                <h2 className="text-neutral-900 mb-6 font-bold text-2xl text-center">
                  {isLogin ? "Login" : "Create an account"}
                </h2>

                {successMessage && (
                  <div className="mb-4 p-2 bg-green-100 text-green-700 rounded text-sm">
                    {successMessage}
                  </div>
                )}

                {error && (
                  <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
                    {error}
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  {!isLogin && (
                    <div className="relative mb-6">
                      <span className="absolute -top-3 left-2 px-1 text-sm text-gray-600 font-bold bg-white">
                        Full Name
                      </span>
                      <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        type="text"
                        className="w-full h-11 px-3 
                        text-base font-normal 
                        bg-[#F3F4F6FF]
                        rounded-sm outline-none
                        focus:border-[#11D396FF] focus:ring-1 focus:ring-[#11D396FF] focus:bg-white
                        transition-all duration-200"
                        required={!isLogin}
                      />
                    </div>
                  )}

                  <div className="relative mb-6">
                    <span className="absolute -top-3 left-2 px-1 text-sm text-gray-600 font-bold bg-white">
                      Email
                    </span>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example.email@gmail.com"
                      type="email"
                      className="w-full h-11 px-3 
                      text-base font-normal 
                      bg-[#F3F4F6FF]
                      rounded-sm outline-none
                      focus:border-[#11D396FF] focus:ring-1 focus:ring-[#11D396FF] focus:bg-white
                      transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="relative mb-6">
                    <span className="absolute -top-3 left-2 px-1 text-sm text-gray-600 font-bold bg-white">
                      Password
                    </span>
                    <input
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder={
                        isLogin
                          ? "Enter your password"
                          : "Enter at least 8+ characters"
                      }
                      type="password"
                      className="w-full h-11 px-3 
                      text-base font-normal 
                      bg-[#F3F4F6FF]
                      rounded-sm outline-none
                      focus:border-[#11D396FF] focus:ring-1 focus:ring-[#11D396FF]
                      focus:bg-white
                      transition-all duration-200"
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center
                    text-[#064C36FF] bg-[#11D396FF] w-full h-10
                    rounded-sm shadow-lg hover:bg-[#0FBE86FF]
                    transition-all duration-200 disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : isLogin ? (
                      "Login"
                    ) : (
                      "Register"
                    )}
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setSuccessMessage("");
                    }}
                    className="mt-4 text-sm text-center text-gray-500 hover:text-gray-700"
                  >
                    {isLogin
                      ? "Need an account? Register"
                      : "Already have an account? Login"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
