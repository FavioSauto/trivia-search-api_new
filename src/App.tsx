import React, { useState } from 'react';

// Components
import Header from './components/Header'
import TriviaContainer from './containers/TriviaContainer'
import Modal from './components/Modal'

interface AppProps {}

function App({}: AppProps) {
  const [showModal, setShowModal] = useState(true)

  // Return the App component.
  return (
    <div className="App bg-gray-200">
      <Header />
      <Modal showModal={showModal} setShowModal={setShowModal}/>
      <TriviaContainer />
    </div>
  );
}

export default App;
