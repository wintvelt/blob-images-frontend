import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';

import Hero from '../src/components-home/Hero';
import HeroTitle from '../src/components-home/Hero-Title';
import Benefits from '../src/components-home/Benefits'
import Features from '../src/components-home/Features'
import Quotes from '../src/components-home/Quotes'
import Pricing from '../src/components-home/Pricing'
import PublicPage from '../src/components-generic/PublicPage';

const Home = () => {
    return (
        <main>
            <Hero
                url='/cover_2.jpg'
            >
                <Grid item md={1} />
                <Grid item md={4}>
                    <HeroTitle
                        title='Share memories between friends'
                        subTitle='the simple way'
                    />
                </Grid>
                <Grid item md={1} />
            </Hero>
            <Benefits />
            <Features />
            <Quotes />
            <Pricing />
        </main>
    )
}

export default () => (
    <PublicPage>
        <Home />
    </PublicPage>
);