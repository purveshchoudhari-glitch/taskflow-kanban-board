import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    if (!email || !password) {
      return alert("Fill all fields");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return alert(error.message);
    }

    if (data.session) {
      localStorage.setItem("loggedIn", "true");
      navigate("/boards");
    }
  };

  const signUp = async () => {
    if (!email || !password) {
      return alert("Fill all fields");
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return alert(error.message);
    }

    alert("Account created successfully. Now login.");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0a0a0a",
        color: "white",
      }}
    >
      <div
        style={{
          width: "380px",
          padding: "30px",
          borderRadius: "12px",
          background: "#151515",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>TaskFlow Login</h2>

        <input
          style={inputStyle}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={btnPrimary} onClick={signIn}>
          Login
        </button>

        <button style={btnSecondary} onClick={signUp}>
          Create Account
        </button>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #333",
  background: "#1e1e1e",
  color: "white",
  boxSizing: "border-box",
};

const btnPrimary: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "8px",
  background: "#ff7a18",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const btnSecondary: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "8px",
  background: "#333",
  color: "white",
  border: "none",
  cursor: "pointer",
};