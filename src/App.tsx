import { useState } from "react";
import Login from "./Login";
import Home from "./pages/Home"; // THIS is your Kanban

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={() => setUser({})} />;
  }

  return <Home />;
}