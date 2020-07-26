import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';

import Hero from '../src/components-home/Hero';
import HeroTitle from '../src/components-home/Hero-Title';
import AboutUs from '../src/components-home/AboutUs';
import Privacy from '../src/components-home/Privacy';
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
                        title='Over ons'
                    />
                </Grid>
                <Grid item md={1} />
            </Hero>
            <AboutUs />
            <Privacy />
        </main>
    )
}

export default () => (
    <PublicPage>
        <Home />
    </PublicPage>
);