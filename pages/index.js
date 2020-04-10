import React from 'react'
import Hero from '../src/Hero'
import Benefits from '../src/Benefits'
import Features from '../src/Features'
import Quotes from '../src/Quotes'
import Pricing from '../src/Pricing'


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
            <Pricing />
        </main>
    )
}

export default Home