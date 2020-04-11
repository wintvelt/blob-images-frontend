import React from 'react'
import Hero from '../src/components-home/Hero'
import SignupForm from '../src/components-home/Signup';

const Login = () => {
    return (
        <main>
            <Hero
                url='img/cover.jpg'
            >
                <SignupForm />
            </Hero>
        </main>
    )
}

export default Login