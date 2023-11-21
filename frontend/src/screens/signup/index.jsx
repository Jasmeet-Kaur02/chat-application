import { useState } from "react";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/auth";
import { localStorageKeys, validEmailRegex } from "../../constants";
import PasswordInput from "../../components/passwordInput";

const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useUser();
  const [errors, setErrors] = useState(null);

  const onChange = (e) => {
    const value = e.target.value;
    if (errors) {
      setErrors(null);
    }
    switch (e.target.name) {
      case "fullName":
        setFullName(value);
        break;
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

    if (fullName === "") {
      err.fullName = "Full name is required";
    }
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
    onSignUp();
  };

  const onSignUp = async () => {
    await signup({ fullName, email, password })
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
      .catch((err) => console.log(err));
  };

  return (
    <div className="screen-wrapper">
      <form onSubmit={onValidate}>
        <h2 className="form-heading">Sign Up</h2>
        <label>Full Name</label>
        <input name="fullName" value={fullName} onChange={onChange} />
        {errors?.fullName && <p className="error-message">{errors.fullName}</p>}

        <label>Email</label>
        <input name="email" value={email} onChange={onChange} />
        {errors?.email && <p className="error-message">{errors.email}</p>}

        <label>Password</label>
        <PasswordInput password={password} setPassword={onChange} />
        {errors?.password && <p className="error-message">{errors.password}</p>}

        {errors?.message && <p className="error-message">{errors.message}</p>}

        <div className="btn-wrapper">
          <button type="submit" class="submit-btn">
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
