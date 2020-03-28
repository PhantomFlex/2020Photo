import React from "react";
import { Link } from "react-router-dom";

export function MainMenu() {
  return (
    <div>
      <p>showreel</p>
      <h1>Видеосъемка в Санкт-Петербурге</h1>
      <li>
        <Link to="/about">kto</Link>
      </li>
      <li>
        <Link to="/price">uslugi</Link>
      </li>
      <li>
        <Link to="/portfolio">портфолио</Link>
      </li>
    </div>
  );
}
