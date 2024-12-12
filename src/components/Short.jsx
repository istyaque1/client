import React, { useState } from "react";
import { HiOutlineScissors } from "react-icons/hi2";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Short = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("https://server-3pp3.onrender.com/short", { url })
      .then((res) => {
        setData(
          `https://server-3pp3.onrender.com/${res?.data?.short?.shortCode}`
        );
        setLoading(false);
      })
      .catch((err) => {
        if (err?.response?.data?.status === false) {
          toast.error(err?.response?.data?.message);
        } else {
          toast.error("Too many request , please try again later");
        }

        setLoading(false);
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
        {loading ? (
          <div className="loader-container">
            <div class="loader"></div>
          </div>
        ) : (
          data && (
            <div className="short-container">
              <p style={{ fontSize: "1.2rem" }}>Your short link is ready</p>
              <a href={data} target="_blank" className="link">
                {data}
              </a>
              <div className="copy-btn">
                <button onClick={handleCopy}>Copy</button>
              </div>
            </div>
          )
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Short;
