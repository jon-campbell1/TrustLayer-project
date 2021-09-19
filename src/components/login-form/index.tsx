import React, { useState } from 'react';
import { Leader } from '../../models';
import { getFormattedDate } from '../../helpers';

const LoginForm = ({
    restart, 
    setViewingLeaderBoard, 
    setSavingScore, 
    totalScore,
}: {
    restart: (event: any) => void,
    setViewingLeaderBoard: (event: any) => void,
    setSavingScore: (event: any) => void,
    totalScore: number,
}) => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const saveUser = () => {
        let leaderBoard = JSON.parse(localStorage.getItem('leaderBoard') || '[]');
        leaderBoard.push({
            username,
            totalScore,
            date: getFormattedDate()
        });
       leaderBoard = leaderBoard.sort((a: Leader, b: Leader) => (a.totalScore > b.totalScore) ? -1 : 1);
       const topTen = leaderBoard.slice(0, 10);
       localStorage.setItem('leaderBoard', JSON.stringify(topTen));
       setViewingLeaderBoard(true);
       setSavingScore(false);
    }

    return (
        <div className='login-form'>
            <input type='text' onChange={(e) => { setUsername(e.target.value) }} placeholder='Username'/>

            <input type='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='Password'/>

            <button onClick={restart}>Restart</button>
            <button 
                className={`submit-btn ${!username || !password ? 'disabled' : ''}`} 
                onClick={saveUser} disabled={!username || !password}>
                    Save
            </button>
        </div>
    );
}

export default LoginForm;