import React from "react";
import { Routes, Route } from "react-router-dom";

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
    <div data-testid='show-entire-page'>
      <Header/>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/list" exact element={<List />} />
        <Route path="/my-list" exact element={<MyList />} />
        <Route path="/detail/:name" exact element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
