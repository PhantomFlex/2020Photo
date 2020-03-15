import React, { useState } from "react";

export const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverAnswer, setServerAnswer] = useState("");
  return (
    <>
      <input onChange={e => setUsername(e.target.value)} />{" "}
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
            .then(res => setServerAnswer(res.error))
        }
      >
        Войти
      </button>
      <h1>{serverAnswer}</h1>
    </>
  );
};
