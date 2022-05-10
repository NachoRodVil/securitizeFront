import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WalletsHome from "./walletsHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WalletsHome />} />
      </Routes>
    </Router>

  );
}

export default App;
