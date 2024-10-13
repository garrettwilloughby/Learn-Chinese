import './App.css';
import React, { useState, useEffect } from 'react';
import { getFlashcards, updateFlashcard } from './util/api';
import { ReactComponent as Speak } from './speak.svg';

const Card = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [cardIndex, setCurrentCardIndex] = useState(0);
    const [flip, flipToggle] = useState(false);

    // Fetch flashcards from the API on component load
    useEffect(() => {
        const fetchFlashcards = async () => {
            const cards = await getFlashcards();
            setFlashcards(cards);
        };
        fetchFlashcards();
    }, []);
    const currentFlashcard = flashcards[cardIndex];

    const index = () => {
        // Random card index logic
        if (flashcards.length >= 5) {
            const randomIndex = Math.floor((Math.random() * 3) + 1);
            setCurrentCardIndex(randomIndex);
        } else {
            setCurrentCardIndex(0);
        }
    };

    const speakTerm = () => {
        if (flashcards.length > 0) {
            let utterance;
            if (flip) {
                utterance = new SpeechSynthesisUtterance(currentFlashcard.translation);
                utterance.lang = "en";
            } else {
                utterance = new SpeechSynthesisUtterance(currentFlashcard.chinese);
                utterance.lang = "zh-CN";
            }
            speechSynthesis.speak(utterance);
        }
    };

    const easyTerm = () => {
        algorithmLogic(4);
    };

    const okayTerm = () => {
        algorithmLogic(2);
    };

    const hardTerm = () => {
        algorithmLogic(1);
    };

    const again = () => {
        algorithmLogic(0);
    };

    const algorithmLogic = (q) => {
        const updatedFlashcards = [...flashcards]; // Work with state flashcards
        console.log(updatedFlashcards)

        if (q > 1) {
            if (updatedFlashcards[cardIndex].repetition === 0) {
                updatedFlashcards[cardIndex].interval = 1;
            } else if (updatedFlashcards[cardIndex].repetition === 1) {
                updatedFlashcards[cardIndex].interval = 6;
            } else {
                updatedFlashcards[cardIndex].interval = (updatedFlashcards[cardIndex].interval * updatedFlashcards[cardIndex].ease);
            }
            updatedFlashcards[cardIndex].repetition += 1;
        }

        if (q <= 1) {
            updatedFlashcards[cardIndex].repetition = 0;
            updatedFlashcards[cardIndex].interval = 1;
        }

        updatedFlashcards[cardIndex].ease = updatedFlashcards[cardIndex].ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
        if (updatedFlashcards[cardIndex].ease < 1.3) {
            updatedFlashcards[cardIndex].ease = 1.3;
        }

        updateFlashcard(updatedFlashcards[cardIndex])
        sortByInterval(updatedFlashcards);
        decreaseIntervals(updatedFlashcards);
        index();
        setFlashcards(updatedFlashcards);
        flipToggle(false);
    };

    const sortByInterval = (updatedFlashcards) => {
        updatedFlashcards.sort((a, b) => a.interval > b.interval ? 1 : -1);
        setFlashcards(updatedFlashcards);
    };

    const decreaseIntervals = (updatedFlashcards) => {
        updatedFlashcards.forEach(flashcard => {
            if (flashcard.interval <= 1) {
                flashcard.interval = 1;
            } else if (flashcard.interval >= 100) {
                flashcard.interval /= 2;
            } else {
                flashcard.interval -= 0.05;
            }
        });
        setFlashcards(updatedFlashcards);
    };

    return (
        <div className="container">
            <div>
                {flashcards.length > 0 ? (
                    <div
                        className={`card ${flip ? 'flip' : ''}`}
                        onClick={() => flipToggle(!flip)}
                    >
                        <div className='front'>
                            {currentFlashcard.chinese}
                        </div>
                        <div className='back'>
                            {currentFlashcard.translation}
                        </div>
                    </div>
                ) : (<p>No Flashcards.</p>)}
            </div>

            <div className='speakButton'>
                <div onClick={speakTerm}>
                    <Speak />
                </div>
            </div>

            <div className={`flashcardButtons ${flip ? 'Front' : 'Back'}`}>
                <div className='buttonEasy' onClick={easyTerm}>easy</div>
                <div className='buttonOkay' onClick={okayTerm}>okay</div>
                <div className='buttonHard' onClick={hardTerm}>hard</div>
                <div className='buttonAgain' onClick={again}>again</div>
            </div>
        </div>
    );
};

export default Card;