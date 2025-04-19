import { Link } from "react-router-dom";

const NotFound = ({ errorMessage }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-neutral-800">404</h1>
      <p className="text-lg text-neutral-600 mt-2">{errorMessage}</p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-[#11D396FF] text-white rounded hover:bg-[#0FBE86FF] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
