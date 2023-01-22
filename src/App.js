import "./App.css";
import Calendar from "./component/Calendar";
import Calendar2 from "./component/Calendar2";
import SecondCalendar from "./pages/secondCalendar";
import Home from "./pages/homePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/1" element={<SecondCalendar />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
