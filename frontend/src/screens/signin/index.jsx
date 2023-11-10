import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { signin } from "../../api/auth";

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [user, setUser] = useUser();

  const onSignIn = async () => {
    await signin({
      email,
      password,
    })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="screen-wrapper">
      <form className="form">
        <h2 className="form-heading">Sign In</h2>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} />

        <div className="btn-wrapper">
          <button onClick={onSignIn} className="submit-btn">
            Submit
          </button>
        </div>

        <p className="text">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign up</span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
