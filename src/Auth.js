import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Login from "./Login";
import UserInfo from "./UserInfo";
import "./Login.css";

function Auth() {
  const user = useSelector(selectUser);
  return <div className="loginScreen">{!user ? <Login /> : <UserInfo />}</div>;
}

export default Auth;
