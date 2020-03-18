import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Videos = () => {
  const [disc, setDisc] = useState(["leha loh", "sss"]);

  useEffect(() => {
    fetch("/list", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => setDisc(res));
  }, []);
  console.log(disc);
  return(
      <div>
          {disc && disc.map(el => <div key={el.disc}>{el.disc}</div>)}
      </div>
  );
  }; 