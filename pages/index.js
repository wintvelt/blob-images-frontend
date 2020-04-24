import React, { useContext } from 'react';
import { UserContext } from '../src/UserContext';
import Hero from '../src/components-home/Hero'
import Benefits from '../src/components-home/Benefits'
import Features from '../src/components-home/Features'
import Quotes from '../src/components-home/Quotes'
import Pricing from '../src/components-home/Pricing'
import SignupForm from '../src/components-login/Signup';

const Home = () => {
    const userContext = useContext(UserContext);
    const user = userContext.user;
    return (
        <main>
            <Hero
                url='/cover_2.jpg'
                title='Share memories between friends'
                subTitle='the simple way'
            >
                {!(user && user.isAuthenticated) && <SignupForm />}
            </Hero>
            <Benefits />
            <Features />
            <Quotes />
            <Pricing />
        </main>
    )
}

export default Home