import React from 'react';
import Grid from '@material-ui/core/Grid';

import Hero from '../src/components-home/Hero';
import HeroTitle from '../src/components-home/Hero-Title';
import Terms from '../src/components-home/Terms';
import PublicPage from '../src/components-generic/PublicPage';

const credit = {
    name: '🇸🇮 Janko Ferlič',
    nameLink: 'https://unsplash.com/@itfeelslikefilm?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText',
    link: 'https://unsplash.com/s/photos/library?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText'
};

const TermsMain = () => {
    return (
        <main>
            <Hero
                url='/img/library.jpg'
                credit={credit}
            >
                <Grid item md={1} />
                <Grid item md={4} id='terms'>
                    <HeroTitle
                        title='Algemene voorwaarden'
                    />
                </Grid>
                <Grid item md={1} />
            </Hero>
            <Terms />
        </main>
    )
}

const TermsPage = () => (
    <PublicPage>
        <TermsMain />
    </PublicPage>
);

export default TermsPage;