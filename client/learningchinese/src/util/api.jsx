import { useState, useEffect } from 'react';

export async function addFlashcard(newFlashcard) {
    try {
        const response = await fetch('http://localhost:8000/Card/Create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFlashcard)
          })

        if (!response.ok) {
            throw new Error('Failed to add flashcard');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding flashcard:', error);
        return null;
    }
}

export async function deleteFlashcards(){
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
    }catch(error){
    console.error('Error:', error);
    }
}

export async function getFlashcards() {
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

  export async function updateFlashcard(updatedData) {
    try {
        const response = await fetch(`http://localhost:8000/Card/Update/`, {
            method: 'PUT',  // Use PUT method for updating
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),  // Convert the updated data to JSON
        });

        if (!response.ok) {
            throw new Error('Failed to update the flashcard.');
        }

        const data = await response.json();
        console.log('Card updated successfully:', data);
        return data;
    } catch (error) {
        console.error('Error updating flashcard:', error);
        return null;
    }
}