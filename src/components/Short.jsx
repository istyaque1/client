import React, { useState } from "react";
import { HiOutlineScissors } from "react-icons/hi2";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Short = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_RENDER_URL}/short`, { url })
      .then((res) => {
        setData(
          `${import.meta.env.VITE_RENDER_URL}/${res?.data?.short?.shortCode}`
        );
        setLoading(false);
      })
      .catch((err) => {
        if (err?.status === 400 || err?.status === 404 || err?.status === 500) {
          toast.error(err?.response?.data?.message);
          setDisable(true);
          setTimeout(() => {
            setDisable(false);
          }, 3000);
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
          <div className="short-btn" onClick={handleSubmit}>
            <span>
              <HiOutlineScissors />
            </span>
            <button
              disabled={disable}
              style={{ cursor: `${disable ? "not-allowed" : "pointer"}` }}
            >
              Shorten
            </button>
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
