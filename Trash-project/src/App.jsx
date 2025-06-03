import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import useTimer from './hooks/useTimer';

function App() 
{
  const [trash, setTrash] = useState(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);


  const restartGame = () => {
    setScore(0);
    setQuestionNumber(1);
    setMessage('');
    fetchTrash();
    setIsGameOver(false);
  };


// const fetchTrash = async () => {
//   try {
//     const res = await fetch('https://foursight.app/api/trash');
//     const data = await res.json();
//     setTrash(data);
//     console.log(data);
//   } catch(err){
//     console.error('Error fetching trash:', err)
//   }
// };

// .then(response) [axios.getten sonra kullanabilirsin]
// GameField, trashpicture gibi detaylarla biraz daha susleyebilirsin. Html farki bunu ogren.
const fetchTrash = async () => {
  try {
    const res = await axios.get('https://foursight.app/api/trash');
    setTrash(res.data);
    console.log('Fetched trash:', res.data);
  } catch (err) {
    console.error('Error fetching trash:', err);
  }
};

//UseState kullanmak isteyebilirsin. Ya da yo bu sadece sonraki soruyu cagiriyor.
useEffect(() => {
  console.log('initialize');
  fetchTrash();
}, []);

const handleChoice = (choice) => {
  if(!trash || isGameOver) return;

  if(trash.type === choice){
    setScore(prev => prev + 5);
    setMessage('You won 5 points! Well done!')
  }
  else{
    setScore(prev => prev -15);
    setMessage('You lost 15 points! Now get that trash back!')
  }

  setTimeout(() => {
    setMessage('');
    if (questionNumber < 20) {
      setQuestionNumber((prev) => prev + 1);
      fetchTrash();
    } else {
      setIsGameOver(true);
      setMessage(`🎉 Game Over! Final Score: ${score}`);
    }
  }, 1000);
};

return (
  <div className="app">
    <h1>Trash Game</h1>
    <h2>Score: {score}</h2>
    <h3>Item {questionNumber} / 20</h3>
    {console.log(trash)}
    {trash && (
      <>
        <img
          src={`https://foursight.app/images/${trash.image}`}
          alt={trash.name}
          width="200"
        />
        <p>{trash.name}</p>
        <div className="buttons">
          <button onClick={() => handleChoice('trash')}>Trash</button>
          <button onClick={() => handleChoice('recycling')}>Recycling</button>
          <button onClick={() => handleChoice('compost')}>Compost</button>
        </div>
      </>
      
    )}

    {message && <h2 className="message">{message}</h2>}
    {isGameOver && (
    <button onClick={restartGame} className="restart-button">
      🔁 Restart Game
    </button>
    )}
  </div>
);
}
export default App
