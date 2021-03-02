// @ts-nocheck
// React Components
import React, { useState, useEffect } from "react";

// Interfaces
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

interface TriviaCardProps {
  setAnsweredQuestions: (answeredQuestions: AnsweredQuestions) => void;
  question: Question;
}

// Component
function TriviaCard({ setAnsweredQuestions, question }: TriviaCardProps) {
  // Props
  // Here I'm change question for questionT (question Title) due to a identifier error
  const {
    questionT,
    category,
    type,
    difficulty,
    correct_answer,
    answers,
  }: Question = question;

  // State
  const [checked, setChecked] = useState(question.checked);
  const [answerChosed, setAnswerChosed] = useState("");

  // Effects
  useEffect(
    function answerChecked() {
      if (answerChosed === correct_answer) {
        setAnsweredQuestions((prevState) => {
          return {
            ...prevState,
            correctAnswers: prevState.correctAnswers + 1,
          };
        });
      } else {
        setAnsweredQuestions((prevState) => {
          return {
            ...prevState,
            incorrectAnswers: prevState.incorrectAnswers + 1,
          };
        });
      }
    },
    [checked]
  );

  useEffect(() => {
    setChecked(false);
  }, [question]);

  return (
    <div
      className={`TriviaCard py-4 px-5 rounded-md shadow-lg border select-none ${
        !checked
          ? "bg-white"
          : answerChosed === correct_answer
          ? "bg-green-500"
          : "bg-red-500"
      }`}
    >
      <h3 className="TriviaCard-question-title">
        <div
          className={`TriviaCard-question-difficulty p-1 rounded-md font-bold text-black ${
            difficulty === "easy"
              ? "bg-green-400"
              : difficulty === "medium"
              ? "bg-yellow-400"
              : "bg-red-400"
          }`}
        />
        {questionT}
      </h3>

      <p className="TriviaCard-category font-bold my-1">
        Category: <span>{category}</span>
      </p>

      <p className="TriviaCard-type font-bold my-1">
        Type: <span>{type}</span>
      </p>

      <div className="TriviaCard-answers-container my-4">
        {answers?.map((answer, index) => {
          const answerDash = answer.replace(/\s/g, "-");
          const questionDash = questionT.replace(/\s/g, "-");

          // debugger
          return (
            <div className="flex items-centered">
              {}
              <input
                type="radio"
                key={index}
                className={`TriviaCard-answer my-2 cursor-pointer checked:bg-blue-600 checked:border-transparent`}
                value={`answer${index}-${answerDash}`}
                onChange={() => {
                  setAnswerChosed(answer);
                  setChecked(true);
                }}
                checked={answer === answerChosed}
                onClick={() => {}}
                disabled={!checked ? false : true}
                name={`question-${questionDash}-answer`}
              ></input>
              <label htmlFor={`answer${index}-${answerDash}`} className="ml-2">
                {answer}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TriviaCard;
