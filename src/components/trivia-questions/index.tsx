import React, { useState, useEffect } from 'react';
import { decode } from 'html-entities';
import { Question } from '../../models';
import { randomIndex } from '../../helpers';

import LeaderBoard from '../leader-board';
import LoginForm from '../login-form';
import AnswerChoice from '../answer-choice';

import './trivia-questions.scss';

const TriviaQuestions = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [savingScore, setSavingScore] = useState<boolean>(false);
    const [viewingLeaderBoard, setViewingLeaderBoard] = useState(false);

    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [totalScore, setTotalScore] = useState<number>(0);

    const [selectedAnswer, setSelectedAnswer] = useState<string>('');

    const [questions, setQuestions] = useState<Question[]>([]);
    const [savedAnswers, setSavedAnswers] = useState<string[]>([]);

    useEffect(() => {
        if (!loaded) {
            fetch('https://opentdb.com/api.php?amount=10')
            .then(res => res.json())
            .then(data => {
                setQuestionAnswers(data.results);
            })
            .catch(() => {
                setLoaded(true);
            });
        }
    }, [loaded]);

    const setQuestionAnswers = (questions: Question[]) => {
        questions.forEach((question: Question) => {
            const {type, correct_answer, incorrect_answers } = question;

            if (type === 'multiple') {
                const randInd = randomIndex(0, incorrect_answers.length);
                const answers: string[] = [];
                incorrect_answers.forEach((incorrectAnswer: string, index: number) => {
                    if (index === randInd) {
                        answers.push(correct_answer);
                    }
                    answers.push(incorrectAnswer);
                });
                if (!answers.includes(correct_answer)) {
                    answers.push(correct_answer);
                }
                question.answers = answers;
            } else {
                question.answers = ['True', 'False'];
            }
        });
        setQuestions(questions);
        setTimeout(() => {
            setLoaded(true);
        }, 10);
    }

    const renderAnswers = () =>  {
        const { answers, correct_answer, incorrect_answers } = questions[currentQuestion];

        return  answers.map((answer: string, index: number) =>
            <AnswerChoice 
                answer={answer}
                correct_answer={correct_answer} 
                index={index}
                incorrect_answers={incorrect_answers}
                selectedAnswer={selectedAnswer}
                savedAnswers={savedAnswers}
                currentQuestion={currentQuestion}
                submitted={submitted}
                setSelectedAnswer={setSelectedAnswer}
            />
        );
    }

    const submitAnswer = () => {
        setScoreFromAnswer();
        setSavedAnswers([...savedAnswers, selectedAnswer]);
        setSubmitted(true);
    }

    const setScoreFromAnswer = () => {
        const { correct_answer, difficulty } = questions[currentQuestion];
        if (correct_answer === selectedAnswer) {
            let score = 1;
            if (difficulty === 'medium') {
                score = 2;
            } else if (difficulty === 'Hard') {
                score = 3;
            }

            setTotalScore(score + totalScore)
        }
    }

    const nextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
        setSubmitted(false);
        setSelectedAnswer('');
    }

    const restart = () => {
        setSavedAnswers([]);
        setCurrentQuestion(0);
        setSubmitted(false);
        setSelectedAnswer('');
        setLoaded(false);
        setTotalScore(0);
        setViewingLeaderBoard(false);
        setSavingScore(false);
    }

    const renderButtons = () => 
        <>
            {
                currentQuestion > 0 && 
                <button onClick={() => { setCurrentQuestion(currentQuestion - 1) }}>Previous</button>
            }
            {
                !savedAnswers[currentQuestion] && 
                <button 
                    onClick={submitAnswer} 
                    disabled={!selectedAnswer} 
                    className={`submit-btn ${!selectedAnswer ? 'disabled' : ''}`}>
                        Submit
                </button>
            }
            {
                (submitted || savedAnswers[currentQuestion]) && 
                <button onClick={nextQuestion} className='submit-btn'>Next</button> 
            }
        </>

    const finishedTrivia = loaded && currentQuestion === 10;

    return (
        <div className={`trivia-board ${!loaded || currentQuestion === 10 && !viewingLeaderBoard ? 'centered' : ''}`}>
            {!loaded && 'Loading...'}
            {
                finishedTrivia && !savingScore && !viewingLeaderBoard && (
                    <div className='game-over-text'>
                        <p>GAME OVER</p>
                        <p>SCORE: {totalScore}</p>
                        <button onClick={() => {setSavingScore(true)}}>Save Score</button>
                        <button onClick={restart} className='submit-btn'>Restart</button>
                    </div>
                )
            }
            {
                finishedTrivia && savingScore &&
                <LoginForm 
                    restart={restart} 
                    setViewingLeaderBoard={setViewingLeaderBoard}
                    setSavingScore={setSavingScore}
                    totalScore={totalScore}
                />
            }
            {
                finishedTrivia && viewingLeaderBoard &&
                <LeaderBoard restartAction={restart}/>
            }
            {
                loaded && currentQuestion < 10 && 
                <>
                    <div className='question-wrapper'>
                        <div className='category'><b>Category:</b> {questions[currentQuestion].category.toUpperCase()}</div>
                        <div className='category'><b>Difficulty:</b> {questions[currentQuestion].difficulty.toUpperCase()}</div>
                        <p className='question'>
                            {decode(questions[currentQuestion].question)}
                        </p>
                        {
                            renderAnswers()
                        }
                        <div className='button-container'>
                            {
                                renderButtons()
                            }
                        </div>
                    </div>
                    <div className='stats'>
                        <div className='stat'><b>Questions answered:</b> {savedAnswers.length}</div>
                        <div className='stat'><b>Score:</b> {totalScore}</div>
                    </div>
                </>
            }
        </div>
    )
}

export default TriviaQuestions;