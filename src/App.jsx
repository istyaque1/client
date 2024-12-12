import { useState } from "react";
import "./App.css";
import Short from "./components/Short";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <main>
        <Navbar />
        <Short />
      </main>
    </>
  );
}

export default App;
