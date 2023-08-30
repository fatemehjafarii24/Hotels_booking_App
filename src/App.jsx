import "./App.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Room from "./components/Room/Room";
import Hotels from "./components/Hotels/Hotels";
import Home from "./components/Home/Home";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/AppLayout/AppLayout";
import HotelsProvider from "./context/HotelsProvider";
import Bookmark from "./components/Bookmark/Bookmark";

function App() {
  return (
    <HotelsProvider>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<Room />} />
          <Route path="bookmark" element={<Bookmark />} />
        </Route>
      </Routes>
    </HotelsProvider>
  );
}

export default App;

// hotels
// hotels/:id
