import React, { useEffect } from "react";

function Quiz({
  counter,
  setCounter,
  questions,
  answers,
  nextQuestion,
  index,
  prevQuestion,
  userAnswers,
  setUserAnswers,
  questionIndex,
  setQuestionIndex,
  finishQuiz,
  seconds,
}) {
  const checkAnswer = (value) => {
    let copyUserAnswer = { ...userAnswers };
    copyUserAnswer[index] = true;
    if (questions[index].correct_answer === value) {
      setCounter(counter + 1);
    }
    setUserAnswers(copyUserAnswer);
  };

  const undoQuestion = () => {
    userAnswers[index] = false;
    setUserAnswers(userAnswers);
  };

  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    shuffle(answers);
  }, []);

  return (
    <>
      <div className='quizContainer'>
        <div className='timer'>Timer = {seconds} seconds left</div>
        <h3
          dangerouslySetInnerHTML={{ __html: questions[index].question }}
        ></h3>
        <div className='category'>Category: {questions[index].category}</div>
        <button className='prevQuestion quizButtons' onClick={prevQuestion}>
          Previous Question
        </button>
        {answers.map((answer) => (
          <button
            className='questionButtons'
            disabled={userAnswers[index]}
            onClick={() => checkAnswer(answer)}
          >
            {answer}
          </button>
        ))}
        <button className='nextQuestion quizButtons' onClick={nextQuestion}>
          Next Question
        </button>
        <div className='buttons'>
          {questions.map((question, index) => (
            <button
              className={index === questionIndex ? "active" : ""}
              key={index}
              onClick={() => setQuestionIndex(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button className='quizButtons' onClick={() => undoQuestion()}>
          Undo Question
        </button>
        <br />
        <button className='getButton' onClick={finishQuiz}>
          Submit Quiz
        </button>
      </div>
    </>
  );
}

export default Quiz;
