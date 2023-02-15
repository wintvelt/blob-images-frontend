import React from 'react';
import Grid from '@material-ui/core/Grid';

import Hero from '../../src/components-home/Hero';
import HeroTitle from '../../src/components-home/Hero-Title';
import AboutUs from '../../src/components-home/AboutUs';
import PublicPage from '../../src/components-generic/PublicPage';
import { useRouter } from 'next/router';
import { useActivePrivacy, usePrivacyValue } from '../../src/data/privacyData';

const Privacy = () => {
    const router = useRouter();
    const lang = router.query?.lang;
    const privacyData = useActivePrivacy(lang);

    const privacyLines = privacyData.contents || [];
    console.log(privacyData)

    return (
        <main>
            <Hero
                url='/img/cameras.jpg'
            >
                <Grid item md={1} />
                <Grid item md={4} id='Privacy'>
                    <HeroTitle
                        title={privacyLines[0]}
                    />
                </Grid>
                <Grid item md={1} />
            </Hero>
            <AboutUs />
        </main>
    )
}

const PrivacyPage = () => (
    <PublicPage>
        <Privacy />
    </PublicPage>
);

export default PrivacyPage;