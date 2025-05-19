import { useState } from "react";
import DNATemplate from './components/DNATemplate'
import MatchingPair from './components/MatchingPair'
import MutateButton from './components/MutateButton'
// import {dnaSequence} from './utils/dnaGenerator'
import { dnaSequence, dnaShortSequence } from './utils/dnaGenerator';

function App() 
{
const [template, setTemplate] = useState(dnaShortSequence()); 
const [matching, setMatching] = useState(['_', '_']);
const [clickCount, setClickCount] = useState(0); 
const [mutationFound, setMutationFound] = useState(false); 

const getCorrectPair = (base) => 
{
  switch (base) 
  {
    case 'a': return 't';
    case 'c': return 'g';
    case 'g': return 'c';
    case 't': return 'a';
    default: return '_';
  }
};

const mutate = () => 
{
  setClickCount((prev) => prev+1);
  const newPair = template.map((base) => 
  {
    if (Math.random() < 0.8) 
    {
      const correct = getCorrectPair(base);
      const otherOptions = ['a', 't', 'g', 'c'].filter(b => b!== correct);
      return otherOptions[Math.floor(Math.random() * otherOptions.length)];
    }
    else
    {
      return getCorrectPair(base);
    }
  });

  setMatching(newPair);

  // if(template==)
  const tMutation =
    (template[0] === 't' && newPair[0] === 't') ||
    (template[1] === 't' && newPair[1] === 't');
  if (tMutation) {
    setMutationFound(true);

    setTimeout(() => {
      alert("🎉 Congratulations! You created a freak!");

      setTemplate(dnaShortSequence());
      setMatching(['_', '_']);
      setClickCount(0);
      setMutationFound(false);
    }, 300);
  }
};

return (
  <div style={{textAlign: 'center', marginTop: '50px', marginLeft: '500px'}}>
    <h1> Screwing DNA Game</h1>
    <DNATemplate sequence={template} />
    <MatchingPair sequence={matching}/>
    <MutateButton onClick={mutate}/>
    <p>Mutation attempts: {clickCount}</p>
    {mutationFound && <p style={{color: 'green'}}> Congratulations! You created a freak! </p>}
  </div>  
);
}
export default App;

