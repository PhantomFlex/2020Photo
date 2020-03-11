import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Portfolio = () => {
  const [disc, setDisc] = useState(0);

  useEffect(() => {
    fetch("/leha", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => setDisc(res));
  }, []);

  console.log(disc);
  return (
    <div>
      <h1>Портфолио</h1>
      <li>
        <Link to="/all">все</Link>
      </li>
      <li>
        <Link to="/promo">промо</Link>
      </li>
      <li>
        <Link to="/advertising">реклама</Link>
      </li>
      <li>
        <Link to="/wedding">свадьбы</Link>
      </li>
      <li>
        <Link to="/events">мероприятия</Link>
      </li>
      <li>
        <Link to="/aircamera">съмка с воздуха</Link>
      </li>

      {disc && disc.map(el => <div key={el.disc}>{el.disc}</div>)}
    </div>
  );
};
