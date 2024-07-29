import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/");
        }
    }, [])


    const handlelogin = async () => {
        let result = await fetch("http://localhost:5000/login", {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result)
        if (result.name) {
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/');
        } else {
            alert("Please enter correct details")
        }
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input className="inputBox" type="text" placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)} value={email} />
            <input className="inputBox" type="password" placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)} value={password} />
            <button onClick={handlelogin} className="appButton" type="button">Login</button>
        </div>
    )
}

export default Login