import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM";

const Convert = ({ language, text }) => {
  const [translated, setTranslated] = useState("");
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    //only make a request after 500ms when user stops typing
    const timerId = setTimeout(() => {
      setDebouncedText(text);
    }, 500);

    //clear the time out (500ms) when the user is typing
    return () => {
      clearTimeout(timerId);
    };
  }, [text]);

  //when we make a request inside useEffect, we have to make a separate function for async and await
  useEffect(() => {
    const doTranslation = async () => {
      //we only want the data property from the response
      const { data } = await axios.post(
        //second {} argument is what you want to send along with the body
        //third {} argument is the params
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params: {
            q: debouncedText,
            target: language.value,
            key: API_KEY,
          },
        }
      );
      setTranslated(data.data.translations[0].translatedText);
    };

    //call the function
    doTranslation();
  }, [language, debouncedText]);

  return (
    <div>
      <h1 className="ui header">{translated}</h1>
    </div>
  );
};

export default Convert;

/**
 * only make api request when user
 * 1. 500ms after user changes text
 * 2. change the language
 */
