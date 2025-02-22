import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
// import { useLocation, useNavigate } from "react-router";

const Login = () => {
  const { signInWithGoogle } = useContext(AuthContext);
//   const navigate=useNavigate()
//     const location = useLocation()
//     const from=location.state || '/';

const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      // Prepare user data
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };

      // Send user data to the backend
      const response = await fetch("https://task-management-server-dun-nine.vercel.app/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // console.log("User data saved to the database",response);
        toast.success('Signin Successful')
        window.location.href = "/dashboard/dashboardHome"; // Redirect to home page
        // navigate(from)
      } else {
        console.error("Failed to save user data");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };
  return (
    <div className="flex items-center justify-center py-20 bg-gray-100">
      <div className="bg-white p-20 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Task Management App
        </h1>
        <p className="text-gray-600 mb-6">
          Please sign in with Google to continue
        </p>
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
        >
          <FcGoogle className="text-xl mr-2" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;