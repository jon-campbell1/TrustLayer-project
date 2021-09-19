import { Leader } from '../../models';
import './leader-board.scss';

const LeaderBoard = ({ restartAction }: {
    restartAction: (event: any) => void
}) => {
    const renderLeaders = () => {
        const leaderBoard = JSON.parse(localStorage.getItem('leaderBoard') || '[]');
        return leaderBoard.map((leader: Leader, index: number) =>
            <div className='leaderboard-titles'>
                <div className='title'>{index + 1}</div>
                <div className='title'>{leader.username}</div>
                <div className='title'>{leader.totalScore}</div>
                <div className='title'>{leader.date}</div>
            </div>
        )
    }
    return (
        <div className='leaderboard'>
            <h3>Leader Board:</h3>
            <div className='leaderboard-titles'>
                <div className='title'><u>RANK</u></div>
                <div className='title'><u>USERNAME</u></div>
                <div className='title'><u>SCORE</u></div>
                <div className='title'><u>DATE</u></div>
            </div>
            {
                renderLeaders()
            }
            <button onClick={restartAction} className='submit-btn'>Restart</button>
        </div>
    );
}

export default LeaderBoard;