import React, { useState } from "react";
import { HiOutlineScissors } from "react-icons/hi2";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Short = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/short", { url })
      .then((res) => {
        setData(`http://localhost:8080/${res?.data?.short?.shortCode}`);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(data)
      .then(() => {
        toast.success("Text copied!");
      })
      .catch(() => {
        toast.error("Failed to copy!");
      });
  };

  return (
    <div className="short">
      <div className="main-title">
        <h2>Shorten your link</h2>
      </div>
      <div className="content">
        <div className="main-url">
          <input
            type="text"
            placeholder="Paste your URL to shorten"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="short-btn">
            <span>
              <HiOutlineScissors />
            </span>
            <button onClick={handleSubmit}>Shorten</button>
          </div>
        </div>
        {data && (
          <div className="short-container">
            <p style={{ fontSize: "1.2rem" }}>Your short link is ready</p>
            <a href={data} target="_blank" className="link">
              {data}
            </a>
            <div className="copy-btn">
              <button onClick={handleCopy}>Copy</button>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Short;
