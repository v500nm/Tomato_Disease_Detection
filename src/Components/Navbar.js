import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export const Navbar = () => {
     const { t } = useTranslation();
     const queryParams = new URLSearchParams(window.location.search);
    
       const [lang, setLang] = useState();
useEffect(()=>{
setLang(queryParams.get("lng"))
},[])
      const languages = [
        { value: "en", text: "Select Language" },
        { value: "en", text: "English" },
        { value: "hi", text: "Hindi" },
        { value: "mr", text: "Marathi" },
        { value: "gu", text: "Gujrati" }
       
      ];
        const handleChange = (e) => {
          setLang(e.target.value);
          let loc = window.location.pathname;
          window.location.replace(loc + "?lng=" + e.target.value);
        };
    return (
      <nav>
        <a href="/login">{t("Login")}</a>
        <a href="#" className="right-side">
          {t("Contact Us")}
        </a>
        <a href="#about">{t("About Us")}</a>
        <a href="#diseases">{t("Diseases")}</a>
        <a href="/">{t("HOME")}</a>
        <select value={lang} onChange={handleChange} className="lang">
          {languages.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.text}
              </option>
            );
          })}
        </select>
      </nav>
    );
}