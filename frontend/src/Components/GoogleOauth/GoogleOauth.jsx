import "./GoogleOauth.scss";
import { auth } from "../../utils/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { postData } from "../../utils/api";
import { BASE_URL } from "../../utils/config";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "./GoogleIcon";

const GoogleOauth = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const data = await signInWithGoogle();
      console.log(data);
      const user = {
        username: data.user.displayName,
        email: data.user.email,
        photo: data.user.photoURL,
        role: "user",
      };
      const res = await postData(`${BASE_URL}/auth/google`, user);
      if (res.token) {
        updateUser(res);
        navigate("/");
        toast.success("Logged in successfully!");
      } else {
        toast.error("Something went wrong!");
        updateUser("");
      }
      console.log(res);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="auth-button" onClick={handleSignIn}>
      <h5>
        <GoogleIcon /> <span>Sign in with Google</span>
      </h5>
    </div>
  );
};

export default GoogleOauth;
