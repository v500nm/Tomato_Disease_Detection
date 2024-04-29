import { React, useState, useRef,useEffect } from "react";
import video from "../Images/Animation-1712172716816.webm";
import axios from "axios";
import { useTranslation } from "react-i18next";

export const Form = () => {
  const { t } = useTranslation();
  const [prediction, setPrediction] = useState("");
  const [Confidence, setConfidence] = useState("");
  const [id, setId] = useState(0);
  const [videoVisible, setVideoVisible] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef(null);
const [link,setLink]=useState('')
const[lng,setLng]=useState('en')
  const handleUploadClick = () => {
    fileInputRef.current.click();
const queryParams = new URLSearchParams(window.location.search);
const lngParam = queryParams.get('lng');
setLng(lngParam)

  };

  const fileUploadHandler = async (event) => {
    const selectedFile = event.target.files[0];
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const URL = "https://580e-35-196-131-226.ngrok-free.app/predict";
      // Replace 'YOUR_BACKEND_URL/predict' with the actual backend URL
      const response = await axios.post(URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data);

      // Set prediction result
      setPrediction(response.data.pred_class);
      setConfidence(response.data.pred_conf);
      setId(response.data.id)
 
      // Hide the video
      setVideoVisible(false);

      // Display uploaded image
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error("Error:", error);
    }
  };
useEffect(() => {
  const newLink = `http://localhost:3000/disease/${id}?lng=${lng}`;
  setLink(newLink);
}, [id, lng]);
  return (
    <div className="box">
      <div className="hide">
        {videoVisible && (
          <video
            loop
            autoPlay
            style={{ width: "200px", height: "auto", marginTop: "20px" }}
          >
            <source src={video} type="video/mp4" />
          </video>
        )}
        {videoVisible && <p>{t("CHOOSE AN IMAGE")}</p>}
        {imageUrl && (
          <div>
            <img
              src={imageUrl}
              alt="Uploaded"
              style={{ width: "200px", height: "auto", marginTop: "20px" }}
            />
          </div>
        )}
        {prediction.length === 0 && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              onChange={fileUploadHandler}
              accept="image/*"
              style={{ display: "none" }}
            />
            <button
              onClick={handleUploadClick}
              style={{ display: prediction.length === 0 ? "block" : "none" }}
            >
              {t("Upload")}
            </button>
          </>
        )}

        {prediction && (
          <div>
            <p>
              {t("Predicted Class")}: {prediction}
              <br /> {t("Predicted Confidence")} : {Confidence}
              <br />
              <a href={link} className="viewMoreLink">
                {t("View More Information")}
              </a>
              <br />
            </p>
          </div>
        )}
      </div>
      <div id="responseContainer"></div>
    </div>
  );
};
