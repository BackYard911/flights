import { useState } from "react";
import { signup } from "../../api/auth";
import { Input } from "../global/Input/Input";
import styles from "./signup.module.css";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signup({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1>Signup</h1>
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
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
      <button type="submit">Signup</button>
      <div>
        <span>Already have an account?</span>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    </form>
  );
}
