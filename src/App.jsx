import "./App.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Header from "./components/Header/Header";
import LocationList from "./components/Location/LocationList";
import { Route, Routes } from "react-router-dom";
import Room from "./components/Room/Room";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/rooms/:id" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
