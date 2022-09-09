import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { mainRoutes } from "./routes";
import {sum} from "./chapter01/02basic";
import {IndexPage} from "./pages";

function App() {
  return (
    <Routes>
        {mainRoutes.map(route => {
            return (
                <Route
                    key={route.path}
                    path={route.path}
                    //exact={route.exact}
                    element={<route.component/>}
                />
            );
        })}
      <Route path={"/"} element={<IndexPage/>}/>

    </Routes>
  );
}

export default App;
