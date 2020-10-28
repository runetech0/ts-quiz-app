import { shuffleArray } from './utils'

export const fetchQuestions = async (amount: number, difficulty: Difficulty) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
  const data = await (await fetch(endpoint)).json()
  return data.results.map((question: Question) => (
    {
      ...question,
      answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }
  ))
}



export enum Difficulty {
  EASY = 'easy',
  MDIUM = 'medium',
  HARD = 'hard'
}



type Question = {
  category: string,
  type: string,
  difficulty: string,
  incorrect_answers: string[];
  correct_answer: string;
  question: string;
}

export type finalQuestion = Question & { answers: string[] }