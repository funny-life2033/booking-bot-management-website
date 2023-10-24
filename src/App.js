import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const newSlot = useSelector((state) => state.adi.newSlot);

  return (
    <Router>
      <Routes>
        <Route path="connect" element={<>connect</>} />
        <Route path="bots" element={<>bots</>} />
        <Route path="reserved-slots/:botId" element={<>reserved Slots</>} />
        <Route path="*" element={<Navigate to={"connect"} />} />
      </Routes>
    </Router>
  );
}

export default App;
