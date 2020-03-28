import React, { useEffect, useState } from "react";

export const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [link, setLink] = useState("");
  

  const fetchVideos = () => {
    fetch("/list", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => setVideos(res))
      .catch(err => alert("ошибка, сервер недоступен"));
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div>
      {videos.map((video, id) => (
        <tr>
          <td>{video.name}</td>
          <td>{video.description}</td>
          <td>{video.tag}</td>
          <td>{video.link}</td>
          <td>
            <input
              type="submit"
              id={video.id}
              value="Delete"
              onClick={() => {
                fetch(`/delete/${video.id}`, { method: "POST" }).then(
                  fetchVideos()
                );
              }}
            />
          </td>
        </tr>
      ))}
      <label>Имя</label>
      <br />
      <input
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
      ></input>
      <br />
      <label>Описание</label>
      <br />
      <input
        value={description}
        onChange={e => {
          setDescription(e.target.value);
        }}
      ></input>
      <br />
      <label>Tag</label>
      <br/>
      <select 
        value={tag}
        onChange={e => {
          setTag(e.target.value);
        }}>
      <option>Advertising</option>
      <option>Promo</option>
      <option>Wedding</option>
      <option>Events</option>
      <option>AirCamera</option>
      <option>engtest</option>
        </select>  
      <br/>  
      <label>Ссылка</label>
      <br />
      <input
        value={link}
        onChange={e => {
          setLink(e.target.value);
        }}
      ></input>
      <br />
      <button
        onClick={() => {
          fetch("/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description, link , tag })
          }).then(fetchVideos());
        }}
      >
        Отправить
      </button>
    </div>
  );
};
