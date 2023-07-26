import './App.css';
import React, { useState } from 'react'
import Flashcardlist from './Flashcardlist';

const App = () =>{
  const [flashcards, setFlashcards] = useState(testFlashcards)
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

      <div className = "flashcard" onclick = "flip()">
          <Flashcardlist flashcards = {flashcards}/>
      </div>
      
  </div>

  <div className = "input">
        <div className = "new">
            <label for="term">English</label>
            <input type="text" id = "english" class = "english"></input>
            <label for = "term">Chinese</label>
            <input type="text" id = "chinese" class = "chinese"></input>
            <button onclick = "addTerm()">Add New Term</button>
            <button onclick = "nextTerm()">Next Term</button>
      </div>
  </div>



</body>
  );
}

const testFlashcards = [
  {
    id: 1,
    english: "Hello",
    chinese: "Ni hao"
  },

  {
    id: 2,
    english: "Watermelon",
    chinese: "Xigua"
  },

  {
    id: 3,
    english: "Tea",
    chinese: "Cha"
  }


]




export default App;
