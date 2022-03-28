import { Routes, Route, Link } from "react-router-dom";

//Style
import './App.css';

//Pages
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Header from "./pages/layout/Header";
import List from "./pages/List";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/list" exact element={<List />} />
        <Route path="/detail/:name" exact element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
