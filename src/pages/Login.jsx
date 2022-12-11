import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Container, Wrapper, Title, Form, Input, Button } from './LoginElements';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            const user = await signInWithEmailAndPassword(auth, email, password)
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
    };  
    
    return (
        <Container>
            <Wrapper>
                <Title>LOG IN</Title>
                <Form onSubmit={handleLogin} >
                    <Input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} required />
                    <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} required />
                    <Button>LOGIN</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login;