// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
const[questions, setQuestions] = useState ([])
const[currentIndex, setCurrentIndex] = useState (0)
const[ inputValue, setInputValue] = useState('')
const [score, setScore] = useState (0)


useEffect(function(){
  getDataFromAPI ()
},[])

function getDataFromAPI() {
  fetch('https://the-trivia-api.com/v2/questions')
  .then(res => res.json())
  .then(res =>{
   setQuestions(res)
   res.map(function(item){
    item.options= [...item.incorrectAnswers, item.correctAnswer]
    item.options =  shuffle(item.options)
   })
    console.log(res);
  })
  
}
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  
  while (currentIndex > 0) {

    
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function nextBtn() {
  if (inputValue === ''){
    return alert ('please select any option')
  }
  setCurrentIndex (currentIndex + 1) 
if(questions[currentIndex].correctAnswer === inputValue){
  setScore(score+ 10)
}
setInputValue("")


 


}
function restartBtn() {
  setCurrentIndex (0) 

}
if(!questions.length){
  return<h1>LODING API...</h1>
  
}
 function target(e) {
  const inp = e.target.value
  setInputValue(inp)
 }
const QuizEnded= currentIndex === questions.length
return (
    <div className="App">
    { !QuizEnded ? 
      <div className='App-header'>
        <h1>Quiz app</h1>
        <h2>Q{currentIndex + 1} : {questions [currentIndex].question.text} </h2> 
        
        {questions[currentIndex].options.map(function(item){
          return <div> 
            <input  onChange={target} name='q' type='radio' value={item} checked={inputValue === item} /> {item}
          </div>
        })}
        
        <button onClick={nextBtn} >next</button>
        

      </div> : <div>
        <h2>Percentage</h2>
        <h3>your score : {score}</h3>
        <button onClick={restartBtn} > restart </button>
        </div>
        }
    </div>
  )
}

export default App;