import { useState } from "react";
import { Input } from "../global/Input/Input";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ email, password }).then(() => {
      navigate("/");
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1>Login</h1>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <button type="submit">Login</button>
      <div>
        Don't have an account?
        <button type="button" onClick={() => navigate("/signup")}>
          Signup
        </button>
      </div>
    </form>
  );
}
