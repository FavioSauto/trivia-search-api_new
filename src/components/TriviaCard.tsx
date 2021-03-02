import React from "react";

interface Question {
  question: string;
  category: string;
  type: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface TriviaCardProps {
  question: Question;
}

function TriviaCard(props: TriviaCardProps) {
  const {
    question: {
      question,
      category,
      type,
      difficulty,
      correct_answer,
      incorrect_answers,
    },
  } = props;

  const answers = [...incorrect_answers, correct_answer].sort();

  return (
    <div className="TriviaCard py-4 px-5 rounded-md shadow-lg border select-none">
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
        {question}{" "}
      </h3>

      <p className="TriviaCard-category font-bold my-1">
        Category: <span>{category}</span>
      </p>

      <p className="TriviaCard-type font-bold my-1">
        Type: <span>{type}</span>
      </p>

      <div className="TriviaCard-answers-container my-4">
        {answers.map((answer, index) => {
          const answerDash = answer.replace(/\s/g , "-")
          const questionDash = question.replace(/\s/g , "-")
          console.log(question, questionDash)

          return (
            <div className="flex items-centered">
              <input
                type="radio"
                key={index}
                className={`TriviaCard-answer my-2 cursor-pointer checked:bg-blue-600 checked:border-transparent ${
                  answer === correct_answer
                    ? "bg-green-400 rounded-md"
                    : "incorrect"
                }`}
                value={`answer${index}-${answerDash}`}
                id={`answer${index}-${answerDash}`}
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
