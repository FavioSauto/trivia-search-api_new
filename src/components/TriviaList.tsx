import React from "react";

// Components
import TriviaCard from "./TriviaCard";

interface Question {
  questionT: string;
  category: string;
  difficulty: string;
  type: string;
  correct_answer: string;
  answers: string[];
  checked: boolean;
}

interface AnsweredQuestions {
  correctAnswers: number;
  incorrectAnswers: number;
}

interface TriviaListProps {
  setAnsweredQuestions: (answeredQuestions: AnsweredQuestions) => void;
  displayingQuestions: Question[];
}

function TriviaList({
  setAnsweredQuestions,
  displayingQuestions,
}: TriviaListProps) {
  return (
    <div className="TriviaList col-span-3 grid grid-cols-3 gap-5 bg-white">
      {displayingQuestions?.map((question, index) => (
        <TriviaCard
          setAnsweredQuestions={setAnsweredQuestions}
          key={index}
          question={question}
        />
      ))}
    </div>
  );
}

export default TriviaList;
