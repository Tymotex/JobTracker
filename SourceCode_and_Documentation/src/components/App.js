import React from "react";
import { BrowserRouter } from "react-router-dom";

// Router list defined by AT3K
import RouterList from '../AT3K/pages/RouterList';


export default function App() {
  return (
    <BrowserRouter>
      <RouterList />
    </BrowserRouter>
  );
}
