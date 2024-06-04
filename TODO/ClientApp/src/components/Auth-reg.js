import React from 'react';
import RegisterForm from './Reg';
import LoginForm from "./Auth";
import {Link, BrowserRouter as Router, Route, Routes} from "react-router-dom";

const AuthReg = ({ authHandle }) => {
    const [isAuth, setIsAuth] = React.useState(true);
    
    function toAuth(){
        setIsAuth(true);
    }

    function toReg(){
        setIsAuth(false);
    }
    
    return (
        <div className="auth-reg">
                {isAuth ? (
                    <LoginForm authHandle={authHandle} handleToReg={toReg}/>
                ) : (
                    <RegisterForm authHandle={authHandle} handleToAuth={toAuth} />
                )}
        </div>
    );
};

export default AuthReg;