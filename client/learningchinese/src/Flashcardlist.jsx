import React, { useState, useEffect } from 'react';
import { getFlashcards } from "./util/api";

const Flashcardlist = () => {
  const [flashcards, setFlashcards] = useState(getFlashcards() || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedFlashcards = await getFlashcards();
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