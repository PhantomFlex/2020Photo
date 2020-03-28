import React, { useEffect, useState } from "react";

export const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState([]);

  const fetchVideos = async () => {
    const res = await fetch("/api/videos", {
      headers: {
        "Content-Type": "application/json"
      }
    });
    const videos = await res.json();
    setVideos(videos);
  };

  const deleteVideo = id => {
    fetch(`/api/videos/${id}`, { method: "DELETE" }).then(fetchVideos());
  };

  const createVideo = () => {
    try {
      fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, link, tag })
      }).then(fetchVideos());
    } catch (e) {
      alert(e);
    }
  };

  const fetchTags = async () => {
    try {
      const res = await fetch("api/tags", {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const tags = await res.json();
      setTags(tags.data);
      setTag(tags.data[0].id);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    fetchVideos();
    fetchTags();
  }, []);

  return (
    <div>
      {videos.map((video, id) => (
        <div key={id}>
          {video.name}
          {video.description}
          {video.tag}
          {video.link}
          <input
            key={id + 1}
            type="submit"
            id={video.id}
            value="Delete"
            onClick={() => {
              deleteVideo(video.id);
            }}
          />
        </div>
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
      <br />
      <select
        value={tag}
        onChange={e => {
          console.log(e);
          setTag(e.target.value);
        }}
      >
        {tags.map(tag => (
          <option value={tag.id}>{tag.name}</option>
        ))}
      </select>
      <br />
      <label>Ссылка</label>
      <br />
      <input
        value={link}
        onChange={e => {
          setLink(e.target.value);
        }}
      ></input>
      <button onClick={createVideo}>Отправить</button>
    </div>
  );
};
