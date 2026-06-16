import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login({ onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return alert(error.message);

    onAuth();
  }

  return (
    <div>
      <input onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" />
      <button onClick={login}>Login</button>
    </div>
  );
}