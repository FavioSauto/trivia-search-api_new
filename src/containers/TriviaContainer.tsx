import type { ChangeEvent } from 'react'
import React, {useState, useEffect} from 'react'

// Components
import Form from '../components/Form'
import TriviaList from '../components/TriviaList'

// Initial State
import initialQuestions from '../initialQuestions'

interface Question {
  question: string;
  category: string;
  type: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string;
}

interface FormValues {
  amount: number,
  category: string,
  difficulty: string,
  type: string
}

function TriviaContainer() {
  // State
  // Base API URL
  const [API, setAPI] = useState('https://opentdb.com/api.php?amount=10&category=&type=&difficulty=')
  // FormValues
  const [formValues, setFormValues] = useState({
    amount: 10,
    category: '',
    difficulty: '',
    type: ''
  })
  // Word to search in the API
  const [searchWord, setSearchWord] = useState('')
  // Initial questions
  const [questions, setQuestions] = useState([])
  // Displayed questions
  const [displayingQuestions, setDisplayingQuestions] = useState(questions)

  // Functions
  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    setAPI(
      `https://opentdb.com/api.php?amount=${formValues.amount}&category=${formValues.category}&type=${formValues.type}&difficulty=${formValues.difficulty}`
    );
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    setSearchWord(event.target.value);
  }

  function handleReset() {
    setFormValues({
      amount: 10,
      category: '',
      difficulty: '',
      type: ''
    });

    setSearchWord('');

    setAPI(
      `https://opentdb.com/api.php?amount=${formValues.amount}&category=${formValues.category}&type=${formValues.type}&difficulty=${formValues.difficulty}`
    );
  }

  // useEffects
  useEffect(function newSearch() {
    const { questions: { questions } }: Question[] = initialQuestions;

    fetch(API)
      .then(response => response.json())
      .then(data => {
        setQuestions(data.results)
      })
      .catch(err => {
        console.warn(err)
        setQuestions(questions)
      })
  }, [API])

  useEffect(function displayQuestions() {
    if (questions.length > 1) {
      setDisplayingQuestions(questions)
    }
  }, [questions])

  useEffect(function search() {
    if (searchWord !== '') {
      const searchWordLowerCase = searchWord.toLowerCase();
      let newList = questions.filter((question: Question) => question.question.toLowerCase().includes(searchWordLowerCase)
      );

      setDisplayingQuestions(newList);
    } else {
      setDisplayingQuestions(questions);
    }
  }, [searchWord])

  return (
    <div className="TriviaList w-4/5 h-4/5 p-5 shadow-lg rounded-md grid grid-cols-3 gap-5 bg-white mx-auto my-6">
      <h2 className="TriviaList-title text-2xl">Questions</h2>

      <Form handleSubmit={handleSubmit} handleChange={handleChange} formValues={formValues} handleSearch={handleSearch} searchWord={searchWord} handleReset={handleReset} />

      <TriviaList displayingQuestions={displayingQuestions} />
    </div>
  )
}

export default TriviaContainer
