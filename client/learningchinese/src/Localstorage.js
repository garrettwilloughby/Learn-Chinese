import React, { useState } from "react";
import useApi from './components/apiUtil';
import FlashcardList from "./Flashcardlist";
import Translate from './translate.png'


function LocalStorage() {
    
    //input is the variable, set input is a function that sets the varaible. Default is empty.
    const [englishInput, setEnglishInput] = useState('');
    const [chineseInput, setChineseInput] = useState('');

    const translation = async (english) => {
        try {
            let apiUrl = `https://api.mymemory.translated.net/get?q=${english}&langpair=en|zh`;
            const res = await fetch(apiUrl);
            const data = await res.json();
            const translatedText = data.responseData.translatedText;
            console.log(data);
            if(translatedText !== "NO QUERY SPECIFIED. EXAMPLE REQUEST: GET?Q=HELLO&LANGPAIR=EN|IT"){
                await setChineseInput(translatedText);
                return translatedText;
            }
            else{
                await setChineseInput('Translation Unavaliable');
                return null;
            }
        } catch (error) {
            console.error('Error translating:', error);
            return null; // Return null or some default value in case of error
        }
    }
    
    const addTerm = async () => {
        // Get existing flashcards from local storage (if any)
        const existingFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        const chineseInput= await translation(englishInput);
        // Create a new flashcard object with the user's inputs.
        // Default values for ease, repetition and interval is 2.5, 0 and 1 respectively.
        // const newFlashcard = {
        //     english: ,
        //     chinese: ,
        //     ease: 2.5,
        //     repetition: 0,
        //     interval: 1
        // };

        const newFlashcard = {
            chinese: chineseInput,
            translation: englishInput,
            pinyin: "Example Pinyin",
            ease: 2.5,
            repetition: 0,
            interval: 1
          };
    
        // Add the new flashcard to the existing flashcards array
        const updatedFlashcards = [...existingFlashcards, newFlashcard];
    
        // Save the updated flashcards array to local storage
        localStorage.setItem('flashcards', JSON.stringify(updatedFlashcards));

        
          
          fetch('http://localhost:8000/Card/Create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFlashcard)
          })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Error:', error));
    
        // Clear the input fields after adding the flashcard
        setEnglishInput('');
        setChineseInput('');
        console.log("added card:", newFlashcard);
        window.location.reload();
      };

    const clearCards =  async () =>{

        if (window.confirm('Are you sure you want to delete all flashcards?')) {
            try {
                const response = await fetch('http://localhost:8000/Card/DeleteAll', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
        localStorage.clear();
        window.location.reload();
            
    }catch(error){
        console.error('Error:', error);
    }
    }
    }   

    const undo = () => {
        const existingFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        existingFlashcards.pop();
        localStorage.setItem('flashcards', JSON.stringify(existingFlashcards));
        window.location.reload();
    }

    const deleteCard = () =>{
        const existingFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        const selectedCard = {
            english: englishInput,
            chinese: chineseInput,
          };

    
        localStorage.removeItem('flashcards', existingFlashcards[selectedCard]);
        localStorage.setItem('flashcards', JSON.stringify(existingFlashcards));

        setEnglishInput('');
        setChineseInput('');
        window.location.reload();
    }

    return (
    <div className = "input">

        
        <div className = "new">
            <input type="text" className = "term" autocomplete="off" id = "english" placeholder = "English Term" class = "english" value = {englishInput} onChange={(e) => setEnglishInput(e.target.value)}></input>
            <input type="text" className = "term" autocomplete="off" id = "chinese" placeholder = "Chinese Term" class = "chinese" value = {chineseInput} onChange={(e) => setChineseInput(e.target.value)}></input>

        <div className="editButtons">
            <div className = "add" onClick = {addTerm} >+</div>
            <div className = "delete" onClick = {deleteCard} >-</div>
            <div className="clear" onClick = {clearCards} >⃠</div>
            <div className="undo" onClick = {undo} >⎌</div>
            <div className="translate" onClick = {() => translation(englishInput)}>Translate</div>
        </div>

        </div>

        <div className = 'flashcardlist'>
            <FlashcardList />
        </div>

    </div>

   

);
};

export default LocalStorage;