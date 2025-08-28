import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./Components/UserPage";
import Todos from "./Components/Todos"
import Profile from "./Components/UserComponents/UserProfile";

function App() {
  
  return (
      <Router>
      <Routes>
        <Route path="/" element={<User/>} />
        <Route path="/todos" element={<Todos/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </Router>
  );
}

export default App;
