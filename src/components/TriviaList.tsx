import React from 'react'

// Components
import TriviaCard from './TriviaCard'

interface Question {
  question: string;
  category: string;
  type: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string;
}

interface TriviaListProps {
  displayingQuestions: Question[]
}

function TriviaList({ displayingQuestions }: TriviaListProps) {
  return (
    <div className="TriviaList col-span-3 grid grid-cols-3 gap-5 bg-white">
      {displayingQuestions.map((question, index) => (
        <TriviaCard key={index} question={question} />
      ))}
    </div>
  )
}

export default TriviaList
