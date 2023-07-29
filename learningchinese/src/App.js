import './App.css';
import React, { useState } from 'react'
import Flashcardlist from './Flashcardlist';
import LocalStorage from './Localstorage';

const App = () =>{
  const [flashcards, setFlashcards] = useState(getCard())
  return (
    
<body className='body'>
  
{/*all jsx elements must have a parent element*/}
  <header className='nav'>
    <h1 class = "title">學習中文!!</h1>
    <div>
      <button>Flashcards</button>
      <button>Draw</button>
      <button>Test</button>
    </div>


</header>


<div className= "container">  

      <div className = "flashcard">
          <Flashcardlist flashcards = {flashcards}/>
      </div>

      <button onclick = "nextTerm()">Next Term</button>
      
  </div>




</body>
  );
}



const getCard = () => {
  const existingFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
  const testFlashcards = [
    {
      id: 1,
      english: "Hello",
      chinese: "Ni hao"
    },

  ];

  return existingFlashcards;
}




export default App;
