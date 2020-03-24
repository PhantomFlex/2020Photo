import React, { useState } from "react";

import { Redirect } from "react-router-dom";

export const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverAnswer, setServerAnswer] = useState("");
  const [loggedIn , setLoggedIn] = useState(false);
  return (
    <> 
      <input onChange={e => setUsername(e.target.value)} />
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button
        onClick={() =>
          fetch("/auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ password, username })
          })
            .then(res => res.json())
            .then(obj => {
              setLoggedIn(obj.ok);
              if (!obj.ok){
                setServerAnswer(obj.error)
              }
            })
        }
      >
        Войти
      </button>
      <h1>{serverAnswer}</h1>
      {loggedIn && <Redirect to="/videos" />}
    </>
  );
}

//<h1 id="abv">{serverAnswer}</h1>
//<a href="#abv">gtht[jl</a>