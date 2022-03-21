import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRef } from "react";
import { auth } from "./firebase";
import "./SignIn.css";

function SignInScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,

      passwordRef.current.value
    )
      .then((authUser) => {
        localStorage.setItem("user", authUser);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        localStorage.setItem("user", userCredential);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="signIn">
      <form>
        <h1>Sign in</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="Password" type="password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="signUp-gray">New to CineMinT?</span>
          <span className="signUp-link" onClick={register}>
            {" "}
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignInScreen;
