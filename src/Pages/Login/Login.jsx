import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signInWithGoogle } = useContext(AuthContext);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      
      window.location.href = "/"; 
    } catch (error) {
      console.error("Google:", error);
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
          className="flex items-center justify-center w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          <FcGoogle className="text-xl mr-2" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;