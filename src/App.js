import { Routes, Route, Link } from "react-router-dom";

//Style
import './App.css';

//Pages
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Header from "./pages/layout/Header";
import List from "./pages/List";
import MyList from "./pages/MyList";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/list" exact element={<List />} />
        <Route path="/my-list" exact element={<MyList />} />
        <Route path="/detail/:name" exact element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
