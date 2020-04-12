import React from 'react'
import Hero from '../src/components-home/Hero'
import LoginForm from '../src/LoginForm';

const LoginPage = () => {
    return (
        <main>
            <Hero
                url='img/cover.jpg'
            >
                <LoginForm />
            </Hero>
        </main>
    )
}

export default LoginPage