import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core'
import './App.css';
import { Button } from '@material-ui/core'
import { QuestionCard } from './components/QuestionCard'
import { fetchQuestions, Difficulty, finalQuestion } from './components/API'



const sansSerif = "'Open Sans', sans-serif";
const cursive = "'Concert One', cursive";

const styles = makeStyles({
  startButton: {
    marginTop: '20px',
    borderRadius: '7px',
    backgroundColor: '#84a9ac',
    fontFamily: sansSerif,
    '&:hover': {
      backgroundColor: '#84a9ee',
    }
  },
  h1: {
    fontSize: '4em',
    fontFamily: cursive
  }
})


const TOTAL_QUESTIONS = 10;

type userAnswerObject = {
  question: string;
  selectedAnswer: any;
  correct: boolean;
  correctAnswer: string;
}

function App() {

  const classes = styles()
  const [loading, setLoading] = useState<boolean>(false)
  const [questions, setQuestions] = useState<finalQuestion[]>([])
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [userAnswers, setUserAnswers] = useState<userAnswerObject[]>([])
  const [score, setScore] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(true)
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false)


  const startQuiz = async () => {
    setLoading(true)
    const QuestionsData = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
    setQuestions(QuestionsData)
    setQuestionNumber(0)
    setUserAnswers([])
    setScore(0)
    setGameOver(false)
    setLoading(false)
  }


  const nextQuiz = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = questionNumber + 1
    if (next === TOTAL_QUESTIONS) {
      setGameOver(true)
      setScore(0)
      setUserAnswers([])
      setQuestionNumber(0)
      setButtonsDisabled(false)
    } else {
      setButtonsDisabled(false)
      setQuestionNumber(questionNumber + 1)
    }
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    setButtonsDisabled(true)
    const selectedAnswer = e.currentTarget.textContent;
    const correct = questions[questionNumber].correct_answer === selectedAnswer
    const answersObject: userAnswerObject = {
      question: questions[questionNumber].question,
      selectedAnswer: selectedAnswer,
      correct: correct,
      correctAnswer: questions[questionNumber].correct_answer
    }
    setUserAnswers(prev => [...prev, answersObject])
    if (correct) {
      setScore(score + 1)
    }
    else {
    }
  }

  return (
    <div className="App">
      <h1 className={classes.h1}>React Quiz App</h1>
      {!loading && !gameOver &&
        <h3>Score : {score}</h3>
      }
      { loading &&
        <p>Loading Quiz ...</p>}
      { !loading && !gameOver &&
        < QuestionCard question={questions[questionNumber].question} answers={questions[questionNumber].answers} callback={checkAnswer} userAnswer={userAnswers ? userAnswers[questionNumber] : undefined} questionNumber={questionNumber} totalQuestions={TOTAL_QUESTIONS} buttonsState={buttonsDisabled} />
      }
      {
        !gameOver && buttonsDisabled && <Button className={classes.startButton} variant='outlined' onClick={nextQuiz}>Next</Button>
      }
      {gameOver &&
        <Button className={`${classes.startButton}`} variant='outlined' onClick={startQuiz}>Start Quiz</Button>
      }
    </div>
  );
}

export default App;
