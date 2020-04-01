import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../pages/PopUp.css";
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
          gridTemplateRows: "600px 600px 600px 600px 600px",
          gridTemplateColumns: "repeat(3, 1fr)"
        }}
      >
        {filteredVideos.map((video, i) => {
          return (
            <div style={{ border: "1px solid red" }}>
              <a href="#openModal">
                <img src={video.preview} width="400" height="300" />
              </a>
              <div id="openModal" className="modalDialog">
                <div>
                  <a href="#close" title="Close" className="close">
                    X
                  </a>
                  <iframe
                    width="650"
                    height="450"
                    src={video.link}
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  />
                </div>
              </div>
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
