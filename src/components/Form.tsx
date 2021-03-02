import React, { ChangeEvent } from "react";

interface FormValues {
  amount: number;
  category: string;
  difficulty: string;
  type: string;
}

interface FormProps {
  handleSubmit: (event: React.SyntheticEvent) => void;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  formValues: FormValues;
  handleSearch: (
    event: ChangeEvent<HTMLButtonElement | MouseEvent | any>
  ) => void;
  searchWord: string;
  handleReset: () => void;
}

function Form({
  handleSubmit,
  handleChange,
  formValues,
  handleSearch,
  searchWord,
  handleReset,
}: FormProps) {
  return (
    <div className="FormWrapper col-span-2">
      <form
        onSubmit={handleSubmit}
        className="TriviaList-form flex content-between flex-wrap"
        id="filterForm"
      >
        <div className="TriviaList-formGroup mb-4">
          <label className="font-bold" htmlFor="amount">
            Number of questions:{" "}
          </label>
          <input
            onChange={handleChange}
            type="number"
            name="amount"
            id="amount"
            value={formValues.amount}
            className="formControl border-2 rounded-md border-gray-400 pl-1 w-2/12"
          />
        </div>

        <div className="TriviaList-formGroup">
          <label className="font-bold" htmlFor="category">
            Select Category:{" "}
          </label>
          <select
            onChange={handleChange}
            name="category"
            id="category"
            className="formControl border-2 rounded-md border-gray-400 pl-1 w-6/12"
            value={formValues.category}
          >
            <option value="">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musical & Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science & Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime & Manga</option>
            <option value="32">Entertainment: Cartoon & Animations</option>
          </select>
        </div>

        <div className="TriviaList-formGroup">
          <label className="font-bold" htmlFor="difficulty">
            Select Difficulty:{" "}
          </label>
          <select
            onChange={handleChange}
            name="difficulty"
            id="difficulty"
            className="formControl border-2 rounded-md border-gray-400 pl-1 w-4/12"
            value={formValues.difficulty}
          >
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="TriviaList-formGroup">
          <label className="font-bold" htmlFor="type">
            Select Type:{" "}
          </label>
          <select
            onChange={handleChange}
            name="type"
            id="type"
            className="formControl border-2 rounded-md border-gray-400 pl-1 w-4/12"
            value={formValues.type}
          >
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True or False</option>
          </select>
        </div>

        <div className="TriviaList-formGroup">
          <label className="font-bold" htmlFor="words">
            Search words:{" "}
          </label>
          <input
            onChange={handleSearch}
            type="text"
            name="words"
            id="words"
            className="FormControl border-2 rounded-md border-gray-400 pl-1 w-6/12"
            value={searchWord}
          />
        </div>

        <button
          className="TriviaList-buttonFormControl h-8 cursor-pointer px-2 bg-blue-500 outline-none rounded-md text-white text-lg"
          id="btn-searchNew"
          onClick={handleSearch}
        >
          Search New Trivia
        </button>
        <button
          className="TriviaList-buttonFormControl h-8 cursor-pointer px-2 ml-1 border outline-none rounded-md text-lg"
          id="btn-resetTrivia"
          onClick={handleReset}
        >
          Reset Form
        </button>
      </form>
    </div>
  );
}

export default Form;
