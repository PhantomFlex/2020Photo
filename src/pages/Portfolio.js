import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export const Portfolio = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);

  const [tags, setTags] = useState([]);

  const fetchVideos = async () => {
    const res = await fetch("/api/videos", {
      headers: {
        "Content-Type": "application/json"
      }
    });
    const videos = await res.json();

    setVideos(videos);
    setFilteredVideos(videos);
  };

  const fetchTags = async () => {
    try {
      const res = await fetch("api/tags", {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const tags = await res.json();
      tags.data.push({ id: tags.data[tags.data.length - 1] + 1, name: "All" });
      setTags(tags.data);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    fetchVideos();
    fetchTags();
  }, []);
  console.log(videos);
  return (
    <div>
      <div style={{ display: "flex" }}>
        {tags?.map(tag => {
          return (
            <div
              key={tag.id}
              style={{
                border: "1px solid",
                borderRadius: "20%",
                margin: "5px",

                width: "80px",
                paddingLeft: "25px",
                backgroundColor: "pink",
                cursor: "pointer"
              }}
              onClick={() => {
                if (tag.name === "All") {
                  setFilteredVideos(videos);
                  return;
                }
                setFilteredVideos(
                  videos.filter(video => parseInt(video.tag) === tag.id)
                );
              }}
            >
              {tag.name}
            </div>
          );
        })}
      </div>

      <div
        style={{
          height: "100%",
          display: "grid",
          gridGap: "3px",
          gridTemplateRows: "150px 150px 150px 150px 150px",
          gridTemplateColumns: "repeat(6, 1fr)"
        }}
      >
        {filteredVideos.map((video, i) => {
          return (
            <div style={{ border: "1px solid red" }}>
              <p>Имя: {video.name}</p>
              <p>Описание: {video.description}</p>
              <p>Сыллка: {video.link}</p>
              <p>
                Тег:
                {tags.filter(tag => parseInt(video.tag) === tag.id)[0]?.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
