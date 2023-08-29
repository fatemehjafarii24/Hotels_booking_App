import "./App.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Room from "./components/Room/Room";
import Hotels from "./components/Hotels/Hotels";
import Home from "./components/Home/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/rooms/:id" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
