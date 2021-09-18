export interface Question {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
    answers: string[];
};

export interface Leader {
    username: string;
    totalScore: number;
    date: string;
}