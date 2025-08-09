import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./Components/UserPage";
import Todos from "./Components/Todos"

function App() {
  
  return (
      <Router>
      <Routes>
        <Route path="/" element={<User/>} />
        <Route path="/todos" element={<Todos/>} />
      </Routes>
    </Router>
  );
}

export default App;
