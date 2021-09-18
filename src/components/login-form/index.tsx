const LoginForm = ({
    restart, 
    setUsername, 
    setPassword, 
    username, 
    password, 
    saveUser
}: {
    restart: (event: any) => void,
    setUsername: (event: any) => void,
    setPassword: (event: any) => void,
    username: string,
    password: string,
    saveUser: (event: any) => void
}) => {
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