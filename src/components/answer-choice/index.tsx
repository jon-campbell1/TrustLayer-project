const AnswerChoice = ({ 
    answer,
    correct_answer,
    incorrect_answers,
    index,
    selectedAnswer,
    savedAnswers,
    currentQuestion,
    submitted,
    setSelectedAnswer,
}: {
    answer: string,
    correct_answer: string,
    incorrect_answers:string[],
    index: number,
    selectedAnswer: string,
    savedAnswers: string[],
    currentQuestion: number
    submitted: boolean,
    setSelectedAnswer: (event: any) => void
}) => {
    return (
        <div className='answer' key={`answer${index}`}>
        <input 
            type='radio' 
            name='answer'
            className='radio'
            disabled={!!savedAnswers[currentQuestion]} 
            checked={selectedAnswer === answer || savedAnswers[currentQuestion] === answer} 
            onChange={() => { setSelectedAnswer(answer) }}
        /> 
        <div>
            {answer}
            {
                ((submitted && selectedAnswer === answer) || savedAnswers[currentQuestion] === answer) && incorrect_answers.includes(answer) &&
                <span className='incorrect answer-desc'>Incorrect</span>
            }
            {
                (submitted || savedAnswers[currentQuestion]) && correct_answer === answer &&
                <span className='correct answer-desc'>Correct</span>
            }
        </div>
    </div>
    )
}

export default AnswerChoice;