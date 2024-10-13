import React, { useState } from "react";

const translation = async (english) => {
    try {
        let apiUrl = `https://api.mymemory.translated.net/get?q=${english}&langpair=en|zh`;
        const res = await fetch(apiUrl);
        const data = await res.json();
        const translatedText = data.responseData.translatedText;
        if(translatedText !== "NO QUERY SPECIFIED. EXAMPLE REQUEST: GET?Q=HELLO&LANGPAIR=EN|IT"){
            //await setChineseInput(translatedText);
            return translatedText;
        }
        else{
            //await setChineseInput('Translation Unavaliable');
            return null;
        }
    } catch (error) {
        console.error('Error translating:', error);
        return null; // Return null or some default value in case of error
    }
}

export default translation;