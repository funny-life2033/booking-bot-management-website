import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import { useSelector } from "react-redux";
import Connect from "./pages/Connect";
import Bots from "./pages/Bots";
import Slots from "./pages/Slots";

function App() {
  // const newSlot = useSelector((state) => state.adi.newSlot);

  return (
    <Router>
      <Routes>
        <Route path="connect" element={<Connect />} />
        <Route path="bots" element={<Bots />} />
        <Route path="reserved-slots/:botId" element={<Slots />} />
        <Route path="*" element={<Navigate to={"connect"} />} />
      </Routes>
    </Router>
  );
}

export default App;
