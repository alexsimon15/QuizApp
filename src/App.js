import React, { useState, useEffect } from "react";
import Quiz from "./Components/Quiz";
import Setup from "./Components/Setup";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [questionsNumber, setQuestionsNumber] = useState(10);
  const [difficulty, setDifficulty] = useState("easy");
  const [counter, setCounter] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameType, setGameType] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [seconds, setSeconds] = useState(500);
  const [leaderboard, setLeaderboard] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [firstGame, setFirstGame] = useState(true);
  const [userAnswers, setUserAnswers] = useState({});

  const getQuestions = async () => {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${questionsNumber}&difficulty=${difficulty}&type=${gameType}`
    );
    const questions = await res.json();
    setQuestions(questions.results);
    setShowResult(false);
    setCounter(0);
    setDisabled(false);
    setStartGame(true);
    setFirstGame(false);
    setSeconds(500);
  };

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((oldIndex) => oldIndex + 1);
    } else {
      setQuestionIndex(0);
    }
  };

  const prevQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex((oldIndex) => oldIndex - 1);
    } else {
      setQuestionIndex(questions.length - 1);
    }
  };

  const finishQuiz = () => {
    setQuestionIndex(0);
    setQuestions([]);
    setShowResult(true);
    setSeconds(0);
    setStartGame(false);
    setLeaderboard([...leaderboard, `${counter}/${questions.length}`]);
    setUserAnswers({});
  };

  useEffect(() => {
    if (seconds > 0 && startGame) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else if (!firstGame && !showResult) {
      finishQuiz();
    }
  }, [seconds, startGame]);

  console.log(questions);
  return (
    <div className='quizApp'>
      {!startGame && (
        <Setup
          setQuestionsNumber={setQuestionsNumber}
          setDifficulty={setDifficulty}
          setGameType={setGameType}
          gameType={gameType}
          questionsNumber={questionsNumber}
          difficulty={difficulty}
          getQuestions={getQuestions}
        />
      )}
      {startGame && (
        <Quiz
          index={questionIndex}
          questions={questions}
          seconds={seconds}
          counter={counter}
          setCounter={setCounter}
          nextQuestion={nextQuestion}
          prevQuestion={prevQuestion}
          setUserAnswers={setUserAnswers}
          userAnswers={userAnswers}
          questionIndex={questionIndex}
          setQuestionIndex={setQuestionIndex}
          finishQuiz={finishQuiz}
          answers={[
            ...questions[questionIndex].incorrect_answers,
            questions[questionIndex].correct_answer,
          ]}
        />
      )}

      {showResult && (
        <div className='leaderboard'>
          <h1>
            Result: {counter}/{questionsNumber}
          </h1>
          <br />
          <h3>Last Results:</h3>
          {leaderboard.map((score) => (
            <h1>{score}</h1>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
