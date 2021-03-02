# A small trivia game

This is a project where you can search and answer trivia questions

Made with the Open Trivia Database API (https://opentdb.com/)

This is the third version of an online trivia game to pass the time, in this new version you can answer and see if you're right or not.

You can filter the kind of questions you want and the amount you want. There are three select tags, one to select the type of questions (Multiple choice or True/False), one to select the difficulty (Easy, Medium and Hard) and one to select the category (There are 23 categories in total). And there is one input tag of type number to select the amount of questions you want.

Once you have selected all the filters you want you press the "Search new trivia" button. From those questions you can search if any one of them have a word or question you want, this is because you can't directly asks for a specific trivia question to the API. If you want to reset the fields and options chosed you can always click on the "reset" button.

This app has server side rendering with nodejs and express and it renders the html from there, if you have no internet connection or your browser's javscript is disabled you will have 10 questions to answer.

All the API calls are made in the client frontend and there is no use of redux because the project does not use many states yet.

There are tests to check if the app works fine. Hope you enjoy and any feedback will be read.

Thanks for reading! :)

## Instructions
- Clone the repository

- Install dependencies with:
```npm i```

- Run with:
```npm start || npm run start```

