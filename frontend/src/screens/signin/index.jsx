import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { signin } from "../../api/auth";
import { localStorageKeys } from "../../constants";
import { validEmailRegex } from "../../constants";
import PasswordInput from "../../components/passwordInput";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useUser();
  const [errors, setErrors] = useState(null);

  const onChange = (e) => {
    const value = e.target.value;
    if (errors) {
      setErrors(null);
    }
    switch (e.target.name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const onValidate = (e) => {
    e.preventDefault();
    const err = {};
    if (email === "") {
      err.email = "Email is required";
    }
    if (!email.match(validEmailRegex)) {
      err.email = "Email is invalid";
    }
    if (password === "") {
      err.password = "Password is required";
    }

    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }
    onSignIn();
  };

  const onSignIn = async () => {
    await signin({
      email,
      password,
    })
      .then((res) => {
        if (res.status) {
          setUser(res.data.user);
          localStorage.setItem(
            localStorageKeys.loggedInUserToken,
            res.data.accessToken
          );
          navigate("/enter-room");
        } else {
          setErrors({
            message: res.message,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="screen-wrapper">
      <form onSubmit={onValidate} className="form">
        <h2 className="form-heading">Sign In</h2>

        <label>Email</label>
        <input name="email" value={email} onChange={onChange} />
        {errors?.email && <p className="error-message">{errors.email}</p>}

        <label>Password</label>
        <PasswordInput password={password} setPassword={onChange} />
        {errors?.password && <p className="error-message">{errors.password}</p>}

        {errors?.message && <p className="error-message">{errors.message}</p>}

        <div className="btn-wrapper">
          <button type="submit" className="submit-btn">
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
