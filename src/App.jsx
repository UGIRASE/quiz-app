
import { useState, useEffect } from "react";

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Home Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which language is used with React?",
    options: ["Python", "JavaScript", "PHP"],
    answer: "JavaScript"
  },
  {
    question: "Which hook is used to manage state?",
    options: ["useEffect", "useState", "useRef"],
    answer: "useState"
  },
  {
    question: "What is CSS used for?",
    options: ["Styling webpages", "Storing data", "Creating databases"],
    answer: "Styling webpages"
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [finished, setFinished] = useState(false);
  const [bestScore, setBestScore] = useState(
    () => Number(localStorage.getItem("bestScore")) || 0
  );

  const totalQuestions = questions.length;
  const progress = (currentQuestion / totalQuestions) * 100;

  useEffect(() => {
    if (finished && score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore", score);
    }
  }, [finished, score, bestScore]);

  function handleNext() {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setFinished(true);
    }
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer("");
    setFinished(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          React Quiz App
        </h1>

        {finished ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Quiz Completed!
            </h2>

            <p className="text-lg">Your score: {score}/{totalQuestions}</p>
            <p className="text-lg text-green-600 font-bold mt-2">
              Best score: {bestScore}/{totalQuestions}
            </p>

            <button
              onClick={restartQuiz}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-2">
              Question {currentQuestion + 1} of {totalQuestions}
            </p>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <h2 className="text-xl font-semibold mb-4">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedAnswer(option)}
                  className={`w-full p-3 rounded-lg border text-left ${
                    selectedAnswer === option
                      ? "bg-blue-100 border-blue-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg disabled:bg-gray-400"
            >
              {currentQuestion + 1 === totalQuestions
                ? "Finish Quiz"
                : "Next Question"}
            </button>

            <p className="text-center mt-4 text-gray-600">
              Best score: {bestScore}/{totalQuestions}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
