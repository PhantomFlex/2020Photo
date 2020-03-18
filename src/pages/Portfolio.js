import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Portfolio () {
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
    </div>
  );
};
