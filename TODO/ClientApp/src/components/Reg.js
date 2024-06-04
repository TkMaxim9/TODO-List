import React, { useState } from 'react';
import button from "bootstrap/js/src/button";

const RegisterForm = ({authHandle, handleToAuth}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const Reg = async (userName, password) => {
        setError('');
        
        const response = await fetch('/Users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Username: userName,
                Password: password
            }),
        });

        if (!response.ok) {
            const responseData = await response.json();
            setError(responseData.message);
            return;
        }

        const userData = await response.json();

        authHandle(userData);
    }
    
    const Submit = async (event) => {
        event.preventDefault();
        await Reg(username, password);
    };

    return (
        <div>
            <form onSubmit={Submit}>
                <div>
                    <label htmlFor="username">Имя пользователя:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <p>{error}</p>
                </div>
                <div className="regContainer">
                    <button type="submit">Зарегистрироваться</button>
                </div>
            </form>
            <div className="toAuth">
                <a href="#" onClick={handleToAuth}>Войти</a>
            </div>
        </div>
    );
}

export default RegisterForm;
