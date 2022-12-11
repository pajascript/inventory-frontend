import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Container, Wrapper, Title, Form, Input, Button } from './LoginElements';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'
import { GoogleOutlined } from '@ant-design/icons'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
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

    return (
        <Container>
            <Wrapper>
                <Title>LOG IN</Title>
                <Form onSubmit={handleLogin} >
                    <Input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} required />
                    <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} required />
                    <div style={{display: 'flex', gap: '10px', cursor: 'pointer', textDecoration: 'underlined', alignItems: 'center', justifyContent: 'space-around'}} >
                        <Button type='submit' >LOGIN</Button>
                        
                    </div>
                </Form>
                <button onClick={handleGoogleClick} style={{cursor: 'pointer', padding: '0.8rem', background: 'teal', color: '#fff', border: 'none', width: '100%'}} ><GoogleOutlined /> Login with Google</button>
            </Wrapper>
        </Container>
    )
}

export default Login;