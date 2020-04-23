import React from 'react'
import Hero from '../src/components-home/Hero'
import Benefits from '../src/components-home/Benefits'
import Features from '../src/components-home/Features'
import Quotes from '../src/components-home/Quotes'
import Pricing from '../src/components-home/Pricing'
import SignupForm from '../src/components-login/Signup';

const Home = () => {
    return (
        <main>
            <Hero
                url='cover 2.jpg'
                title='Share memories between friends'
                subTitle='the simple way'
            >
                <SignupForm />
            </Hero>
            <Benefits />
            <Features />
            <Quotes />
            <Pricing />
        </main>
    )
}

export default Home