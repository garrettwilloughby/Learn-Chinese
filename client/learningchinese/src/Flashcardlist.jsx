import React from 'react'

function Flashcardlist() {
    const flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
  
    return (
      <div>
        {flashcards.map((flashcard, index) => (
          <div className='listcard' key={index}>
            <p><strong>English:</strong> {flashcard.english}</p>
            <p><strong>Chinese:</strong> {flashcard.chinese}</p>
          </div>
        ))}
      </div>
    );
  } 
  
  export default Flashcardlist;