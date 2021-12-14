import { auth } from "../firebase";
import { getAuth, signOut } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { useNavigate } from "react-router";


export const useAuth = () => {
  const navigate = useNavigate();

  const login = (email: string, password: string, isLogin: boolean) => {
    isLogin?
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      navigate("/");
    })
    .catch((error) => {
      alert(error.message)
    })
    :
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      navigate("/");
    })
    .catch((error) => {
      alert(error.message)
    })
  }

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate("/login");
      // Sign-out successful.
    }).catch((error) => {
      alert(error.message)
      // An error happened.
    });
  }

  return { login, logout }
}