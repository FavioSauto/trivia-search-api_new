// React imports
import React, { useState, useEffect } from "react";
import type { ChangeEvent } from "react";

// Components
import Form from "../components/Form";
import TriviaList from "../components/TriviaList";

// Initial State
import initialQuestions from "../initialQuestions";

// Interfaces
interface Question {
  question: string;
  category: string;
  type: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string;
}

interface NewQuestion {
  questionT: string;
  category: string;
  difficulty: string;
  type: string;
  correct_answer: string;
  answers: string[];
  checked: boolean;
}

interface FormValues {
  amount: number;
  category: string;
  difficulty: string;
  type: string;
}

function TriviaContainer() {
  // State
  // Base API URL
  const [API, setAPI] = useState(
    "https://opentdb.com/api.php?amount=10&category=&type=&difficulty="
  );
  // FormValues
  const [formValues, setFormValues] = useState({
    amount: 10,
    category: "",
    difficulty: "",
    type: "",
  });
  // Word to search in the API
  const [searchWord, setSearchWord] = useState("");
  // Set new search
  const [newSearch, setNewSearch] = useState(true);
  // Initial questions
  const [questions, setQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState({
    correctAnswers: 0,
    incorrectAnswers: 0,
  });
  // Displayed questions
  const [displayingQuestions, setDisplayingQuestions] = useState(questions);

  // Functions
  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    setAPI(
      `https://opentdb.com/api.php?amount=${formValues.amount}&category=${formValues.category}&type=${formValues.type}&difficulty=${formValues.difficulty}`
    );
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  }

  function handleSearch(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    setSearchWord("");
    setNewSearch(true);
  }

  function handleReset() {
    setFormValues({
      amount: 10,
      category: "",
      difficulty: "",
      type: "",
    });

    setSearchWord("");

    setAPI(
      `https://opentdb.com/api.php?amount=${formValues.amount}&category=${formValues.category}&type=${formValues.type}&difficulty=${formValues.difficulty}`
    );

    setNewSearch(true);
  }

  // useEffects
  useEffect(
    function makeNewSearch() {
      if (newSearch) {
        const {
          questions: { questions },
        }: Question[] = initialQuestions;

        fetch(API)
          .then((response) => response.json())
          .then((data) => {
            setQuestions(data.results);
          })
          .catch((err) => {
            console.warn(err);
            setQuestions(questions);
          });

        setAnsweredQuestions((prevState) => {
          return {
            correctAnswers: 0,
            incorrectAnswers: 0,
          };
        })

        setNewSearch(false);
      }
    },
    [newSearch]
  );

  useEffect(
    function displayQuestions() {
      const newQuestions: NewQuestion[] = questions?.map(
        function newQuestionsWithAnswers(question: Question) {
          const newQuestion = {
            questionT: question.question,
            category: question.category,
            difficulty: question.difficulty,
            type: question.type,
            answers: [
              ...question.incorrect_answers,
              question.correct_answer,
            ].sort(),
            correct_answer: question.correct_answer,
            checked: false,
          };

          return newQuestion;
        }
      );

      if (newQuestions.length > 1) {
        setDisplayingQuestions(newQuestions);
      }
    },
    [questions]
  );

  useEffect(
    function search() {
      if (searchWord !== "") {
        const searchWordLowerCase = searchWord.toLowerCase();
        let newList = questions.filter((question: Question) =>
          question.question.toLowerCase().includes(searchWordLowerCase)
        );

        setDisplayingQuestions(newList);
      } else {
        setDisplayingQuestions(questions);
      }
    },
    [searchWord]
  );

  return (
    <div className="TriviaList lg:w-4/5 lg:h-4/5 lg:p-5 p-3 gap-3 shadow-lg rounded-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 bg-white mx-auto my-6">
      <div className="mb-2">
        <h2 className="TriviaList-title text-lg">Questions</h2>

        <div className="mt-2">
          <p className="font-normal">
            Total Questions:{" "}
            <span className="font-bold">{questions.length}</span>
          </p>
          <p className="font-normal">
            Questions Answered:{" "}
            <span className="font-bold">
              {answeredQuestions.correctAnswers +
                answeredQuestions.incorrectAnswers} 
            </span>
          </p>
          <p className="font-normal">
            Correct Answers:{" "}
            <span className="font-bold">
              {answeredQuestions.correctAnswers}
            </span>
          </p>
          <p className="font-normal">
            Incorrect Answers:{" "}
            <span className="font-bold">
              {answeredQuestions.incorrectAnswers}
            </span>
          </p>
        </div>
      </div>

      <Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formValues={formValues}
        handleSearch={handleSearch}
        searchWord={searchWord}
        handleReset={handleReset}
      />

      <TriviaList
        setAnsweredQuestions={setAnsweredQuestions}
        displayingQuestions={displayingQuestions}
      />
    </div>
  );
}

export default TriviaContainer;
