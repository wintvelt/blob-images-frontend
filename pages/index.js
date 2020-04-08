import React from 'react'
import Hero from '../src/Hero'
import Benefits from '../src/Benefits'
import Features from '../src/Features'
import Quotes from '../src/Quotes'


const Home = () => {
    return (
        <main>
            <Hero
                url='cover 2.jpg'
                title='Share memories between friends'
            />
            <Benefits />
            <Features />
            <Quotes />
        </main>
    )
}

export default Home