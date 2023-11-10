import { useState } from "react";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useUser();

  const onSignUp = async () => {
    await signup(name, email, password)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="screen-wrapper">
      <form>
        <h2 className="form-heading">Sign Up</h2>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} />

        <div className="btn-wrapper">
          <button onClick={onSignUp} class="submit-btn">
            Submit
          </button>
        </div>

        <p className="text">
          Already have an account?{" "}
          <span onClick={() => navigate("/signin")}>Sign in</span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
