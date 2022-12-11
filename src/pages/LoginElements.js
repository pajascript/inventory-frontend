import styled from 'styled-components';
import accessories from '../images/loginpic.jpg';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
            rgba(255, 255, 255, 0.1), 
            rgba(255, 255, 255, 0.1)
        ), 
        url(${accessories}) center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Wrapper = styled.div`
    padding: 20px;
    width: 25%;
    background: #fff;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

export const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`;

export const Button = styled.button`
    width: 100%;
    border: none;
    padding: 15px 20px;
    background: teal;
    color: #fff;
    cursor: pointer;
    margin-bottom: 10px;
    transition: all 200ms ease-in-out;

    &:disabled {
        color: green;
        cursor: not-allowed;
    }

    &:hover {
        background-color: rgb(1, 101, 101);
    }
`;

export const Link = styled.a`
    margin: 5px 0;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;

export const Error = styled.p`
    color: red;
`;

export const ToggleButton = styled.p`
    border: none;
    color: teal;
    text-decoration: underline;
    cursor: pointer;
    background: none;
    text-align: left;
    margin-bottom: 15px;
    transition: all 200ms ease-in-out;

    &:hover {
        transform: translateY(-2px);
    }
`;

export const GoogleBtn = styled.button`
    cursor: pointer;
    padding: 0.8rem;
    background: inherit;
    border: 2px solid teal;
    width: 100%;
    transition: all 200ms ease-in-out;

    &:hover { 
        background: teal;
        color: #fff;
    }
`;