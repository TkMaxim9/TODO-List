import React, {useState} from 'react';
import button from "bootstrap/js/src/button";

const LoginForm = ({authHandle, handleToReg}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const Auth = async (userName, password) => {
        setError('Выполняется вход...');
        
        const response = await fetch('/Users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userName,
                password: password
            }),
        });

        if (!response.ok) {
            setError('Неверный логин или пароль');
            return;
        }
        setError('');
        
        const userData = await response.json();

        authHandle(userData);
    }
    
    const Submit = async (event) => {
        event.preventDefault();
        await Auth(username, password);
    };
    
    return (
        <div>
            <form onSubmit={Submit}>
                <input type="text" placeholder="Имя пользователя" onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Войти</button>
                <p>{error}</p>
            </form>
            <div className="toReg">
                <a href="#" onClick={handleToReg}>Регистрация</a>
            </div>
        </div>
        
    );
}

export default LoginForm;