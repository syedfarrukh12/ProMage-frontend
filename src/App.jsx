import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./utils/AppRoutes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <AppRoutes></AppRoutes>
    </Router>
  );
}

export default App;
