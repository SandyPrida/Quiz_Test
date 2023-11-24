import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // Question
  const questions = [
    {
      questionText: "Apa ibukota Indonesia?",
      answerOptions: [
        { answerText: "Jakarta", isCorrect: true },
        { answerText: "Surabaya", isCorrect: false },
        { answerText: "Bandung", isCorrect: false },
        { answerText: "Semarang", isCorrect: false },
      ],
    },
    {
      questionText: "Siapakah penemu teori relativitas umum?",
      answerOptions: [
        { answerText: "Isaac Newton", isCorrect: false },
        { answerText: "Albert Einstein", isCorrect: true },
        { answerText: "Galileo Galilei", isCorrect: false },
        { answerText: "Nikola Tesla", isCorrect: false },
      ],
    },
    {
      questionText: "Berapa banyak benua yang ada di dunia?",
      answerOptions: [
        { answerText: "5", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
        { answerText: "8", isCorrect: false },
      ],
    },
    {
      questionText: "Apakah simbol kimia untuk besi?",
      answerOptions: [
        { answerText: "Fe", isCorrect: true },
        { answerText: "Ir", isCorrect: false },
        { answerText: "Au", isCorrect: false },
        { answerText: "Pb", isCorrect: false },
      ],
    },
    {
      questionText: "Siapakah pelukis Mona Lisa?",
      answerOptions: [
        { answerText: "Vincent van Gogh", isCorrect: false },
        { answerText: "Pablo Picasso", isCorrect: false },
        { answerText: "Leonardo da Vinci", isCorrect: true },
        { answerText: "Michelangelo", isCorrect: false },
      ],
    },
  ];

  // Score
  const [score, setScore] = useState(0);

  // Timer
  const [time, setTime] = useState(20);

  // submit

  const [submitQuestion, setsubmitQuestion] = useState(null);

  // current question
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswerButtonClick = (isCorrect) => {
    setsubmitQuestion(isCorrect);
  };

  const handleNextQuestion = () => {
    if (submitQuestion === true) {
      setScore(score + 20);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTime(20);
    } else {
      setShowScore(true);
    }
  };

  const [showScore, setShowScore] = useState(false);

  const handleResetQuestion = () => {
    setShowScore(false);
    setCurrentQuestion(0);
    setScore(0);
  };

  useEffect(() => {
    let timer;
    if (time > 0 && !showScore) {
      timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (time === 0 && !showScore) {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setTime(20); // Reset waktu untuk pertanyaan berikutnya
      } else {
        setShowScore(true);
      }
    }
    return () => clearTimeout(timer);
  }, [time, currentQuestion, showScore]);

  return (
    <>
      {showScore ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid black",
            width: "500px",
            height: "300px",
            borderRadius: "20px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <h3>You score : {score}</h3>
          <button
            onClick={handleResetQuestion}
            className="resetQuiz"
            style={{
              margin: "5px",
              border: "1px solid black",
            }}
          >
            Reset
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid black",
            width: "500px",
            borderRadius: "20px",
            height: "fit-content",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <div
            style={{
              width: "90%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3>Quiz</h3>
            <div className="timer">
              <p>Time left: {time}</p>
            </div>
          </div>
          <div
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <div
              className="question"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "start",
              }}
            >
              <p
                style={{
                  margin: "0",
                }}
              >
                Question {currentQuestion + 1}{" "}
              </p>
              <p
                className="question-text"
                style={{
                  margin: "5px 0px 20px 5px",
                }}
              >
                {" "}
                {questions[currentQuestion].questionText}{" "}
              </p>
            </div>
            <div
              className="answer"
              style={{
                marginBottom: "30px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {questions[currentQuestion].answerOptions.map(
                (answerOptions, index) => (
                  <button
                    style={{
                      margin: "5px",
                      border: "1px solid black",
                    }}
                    key={index}
                    onClick={() =>
                      handleAnswerButtonClick(answerOptions.isCorrect)
                    }
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "lightgreen";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "white";
                    }}
                  >
                    {" "}
                    {answerOptions.answerText}{" "}
                  </button>
                )
              )}
            </div>
            <div
              style={{
                width: "100%",
              }}
            >
              <button
                on
                onClick={handleNextQuestion}
                style={{
                  margin: "5px",
                  border: "1px solid black",
                  float: "right",
                  marginBottom: "30px",
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
