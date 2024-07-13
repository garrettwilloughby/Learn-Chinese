import React, { useState, useEffect } from 'react';

async function getFlashCards() {
  try {
    const response = await fetch('http://localhost:8000/Card/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const Flashcardlist = () => {
  const [flashcards, setFlashcards] = useState(JSON.parse(localStorage.getItem('flashcards')) || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedFlashcards = await getFlashCards();
      setFlashcards(fetchedFlashcards);
      setLoading(false);
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after initial render

  if (loading) {
    return <div>Loading...</div>;
  }

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
};

export default Flashcardlist;