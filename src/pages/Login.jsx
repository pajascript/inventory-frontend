import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Container, Wrapper, Title, Form, Input, Button, ToggleButton, GoogleBtn } from './LoginElements';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'
import { GoogleOutlined } from '@ant-design/icons'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isRegister) {
            try {
                await signInWithEmailAndPassword(auth, email, password)
                alert("Logged in successfully")
                history.push('/')
            } catch (err) {
                if (err.message === "Firebase: Error (auth/user-not-found).") {
                    alert("User not found! Please try again.")
                }
                if (err.message === "Firebase: Error (auth/wrong-password).") {
                    alert("Incorrect Password! Please try again.")
                }
            }
        }
        else {
            try {
                if (password === confirmPassword) {
                    await createUserWithEmailAndPassword(auth, email, password)
                    alert("Logged in successfully")
                    history.push('/')
                } else {
                    alert("Passwords does not match")
                }
            } catch (err) {
                alert(err.message)
            }
        }
    };

    const handleGoogleClick = async (e) => {
        try {
            e.preventDefault();
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
        } catch (err) {
            alert(err.message)
        }
    }

    const handleToggle = () => {
        setIsRegister(prev => !prev)
    }

    return (
        <Container>
            <Wrapper>
                <Title>LOG IN</Title>
                <Form onSubmit={handleSubmit} >
                    <Input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} required />
                    <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} required />
                    {isRegister && (
                        <Input placeholder="Password" type="password" onChange={(e) => setConfirmPassword(e.target.value)} required />
                    )}
                    <div style={{display: 'flex', flexDirection: 'column', cursor: 'pointer', textDecoration: 'underlined', alignItems: 'center', justifyContent: 'space-around'}} >
                        <Button type='submit' >{isRegister ? "REGISTER" : "LOGIN"}</Button>
                        <ToggleButton onClick={handleToggle} >{isRegister ? "Already have an account? Login" : "Don't have an account? Register"}</ToggleButton>
                    </div>
                </Form>
                <GoogleBtn onClick={handleGoogleClick} ><GoogleOutlined /> Login with Google</GoogleBtn>
            </Wrapper>
        </Container>
    )
}

export default Login;