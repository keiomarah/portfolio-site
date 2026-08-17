import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function PageHeader() {
  return (
    <header className="page-header">
      <img></img>
      <nav>
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Projects</a>
          </li>
          <li>
            <a>About Me</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
        </ul>
      </nav>
      <button>Get in Touch</button>
    </header>
  );
}
function App() {
  return <></>;
}

export default App;
