import { useRef, useState,useEffect } from "react";
import ResultScreen from "./ResultScreen.js";

const Question = ({ questions }) => {
    const buttonRef = useRef([]);
    const [q, setQ] = useState("");
    const [options, setOptions] = useState([]);
    const [ans, setAns] = useState('');
    const [finish, setFinish] = useState(false);
    const [positions, setPositions] = useState([
        { top: 50, left: 100 },
        { top: 50, left: 200 },
        { top: 50, left: 400 },
        { top: 50, left: 600 },
        { top: 50, left: 800 },
        { top: 50, left: 1000 }
    ]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [count, setCount] = useState(0);
    const [results, setResults] = useState([]); 
    const step = 50;

    useEffect(() => {
        if (questions.length > 0) {
            setQ(questions[0].question);
            setOptions(questions[0].options);
        }
    }, [questions]);

    const handleQuestions = () => {
        const currentQuestion = questions[count];
        const correctAnswers = currentQuestion.correctAnswer || [];

        
        const buttonPositions = buttonRef.current.map((btn, i) => {
            if (!btn) return { top: 0, left: 0, label: options[i] };
            
            const rect = btn.getBoundingClientRect();
            return {
                top: rect.top,
                left: rect.left,
                label: options[i]
            };
        });

        
        const sortedButtons = [...buttonPositions].sort((a, b) => {
            if (a.top === b.top) return a.left - b.left;
            return a.top - b.top;
        });

        
        const userAnswer = sortedButtons.map(item => item.label);

        
        
        let check = true;

        for (let j = 0; j < correctAnswers.length; j++) {
          if (userAnswer[j] !== correctAnswers[j]) {
            check = false;
            break;
          }
        }
        
        setAns(check ? 'correct' : 'incorrect');
        
        

                setResults(prev => [...prev, {
            question: currentQuestion.question,
            userAnswer,
            correctAnswers,
            isCorrect:check?'correct':'incorrect'
            
        }]);

        
        if (count < questions.length - 1) {
            setQ(questions[count + 1].question);
            setOptions(questions[count + 1].options);
            
            setPositions([
                { top: 50, left: 100 },
                { top: 50, left: 200 },
                { top: 50, left: 400 },
                { top: 50, left: 600 },
                { top: 50, left: 800 },
                { top: 50, left: 1000 }
            ]);
            setCount(prev => prev + 1);
        } else {
            setFinish(true);
        }
    };

    const moveButton = (direction) => {
        if (selectedIndex === null) return;

        setPositions((prev) =>
            prev.map((pos, i) => {
                if (i !== selectedIndex) return pos;
                switch (direction) {
                    case "up": return { ...pos, top: pos.top - step };
                    case "down": return { ...pos, top: pos.top + step };
                    case "left": return { ...pos, left: pos.left - step };
                    case "right": return { ...pos, left: pos.left + step };
                    default: return pos;
                }
            })
        );
        console.log(results)

      };



    return (
        <div className="relative h-screen p-4 bg-gray-50">
            {finish ? (
                <ResultScreen results={results} />
            ) : (
                <>
                    <h3 className="text-lg mb-4">Select the missing word in correct order</h3>
                    <h4 className="mb-6">{q}</h4>

                    {options.map((item, index) => (
                        <button
                            key={index}
                            ref={(el) => (buttonRef.current[index] = el)}
                            onClick={() => setSelectedIndex(index)}
                            style={{
                                position: "absolute",
                                top: positions[index]?.top || 0,
                                left: positions[index]?.left || 0,
                                zIndex: selectedIndex === index ? 10 : 1,
                            }}
                            className={`px-4 py-2 rounded border transition-all duration-200 ${
                                selectedIndex === index ? "bg-blue-900 text-white" : "bg-white text-black"
                            }`}
                        >
                            {item}
                        </button>
                    ))}

                    <div className="fixed bottom-4 left-4 space-x-2">
                        <button onClick={() => moveButton("up")}>⬆️</button>
                        <button onClick={() => moveButton("down")}>⬇️</button>
                        <button onClick={() => moveButton("left")}>⬅️</button>
                        <button onClick={() => moveButton("right")}>➡️</button>
                    </div>

                    <button
                        onClick={handleQuestions}
                        className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded"
                    >
                        {count < questions.length - 1 ? "Next" : "Finish"}
                    </button>
                </>
            )}
        </div>
    );
};

export default Question;