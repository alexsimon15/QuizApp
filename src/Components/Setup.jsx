import React from "react";

function Setup({
  setQuestionsNumber,
  setDifficulty,
  setGameType,
  gameType,

  questionsNumber,
  difficulty,
  getQuestions,
}) {
  return (
    <>
      <div className='container'>
        <h1 className='title'>QUIZ</h1>
        <h2>Choose number of questions:</h2>
        <select
          className='buttonQuiz'
          value={questionsNumber}
          onChange={(e) => setQuestionsNumber(e.target.value)}
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
        <h2>Choose the difficulty:</h2>
        <select
          className='buttonQuiz'
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value='easy'>easy</option>
          <option value='medium'>medium</option>
          <option value='hard'>hard</option>
        </select>
        <h2>Choose the Game Type:</h2>
        <select
          className='buttonQuiz'
          value={gameType}
          onChange={(e) => setGameType(e.target.value)}
        >
          <option value='multiple'>Multiple Choice</option>
          <option value='boolean'>True/False</option>
        </select>
        <br />
        <button className='getButton' onClick={getQuestions}>
          Get Questions
        </button>
      </div>
    </>
  );
}

export default Setup;
