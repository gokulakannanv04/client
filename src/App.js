// client/src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [examples, setExamples] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetch('http://localhost:5000/api/examples')
      .then((response) => response.json())
      .then((data) => setExamples(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleAddExample = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/examples', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      });

      if (response.ok) {
        const newExample = await response.json();
        setExamples([...examples, newExample]);
        setNewMessage('');
      } else {
        console.error('Error adding example:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding example:', error);
    }
  };

  return (
    <div className="App">
      <h1>Full Stack App</h1>
      <ul>
        {examples.map((example) => (
          <li key={example._id}>{example.message}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleAddExample}>Add Example</button>
      </div>
    </div>
  );
}

export default App;
