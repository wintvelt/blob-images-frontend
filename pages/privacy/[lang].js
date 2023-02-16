import React from 'react';
import Grid from '@material-ui/core/Grid';

import Hero from '../../src/components-home/Hero';
import HeroTitle from '../../src/components-home/Hero-Title';
import PublicPage from '../../src/components-generic/PublicPage';
import { gateway } from '../../src/aws-amplify/config-env';
import { Typography } from '@material-ui/core';

const MDLine = ({ line }) => {
    const [variant, text] = (line.slice(0, 2) === '# ') ? ['h2', line.slice(2)]
        : (line.slice(0, 3) === '## ') ? ['h4', line.slice(3)]
            : ['body1', line];
    return <Typography variant={variant} gutterBottom>{text}</Typography>
}

const Privacy = ({ lines }) => {
    return (
        <main>
            <Hero
                url='/img/cameras.jpg'
            >
                <Grid item md={6} id='Privacy'>
                    <HeroTitle
                        title={lines[0].slice(2)}
                    />
                </Grid>
            </Hero>
            <Grid container direction="column"
                justifyContent="flex-start"
                alignItems="center">
                <Grid item md={6} >
                    {lines.slice(1).map((line, i) => <MDLine key={'line' + i} line={line} />)}
                </Grid>
            </Grid>
        </main>
    )
}

const PrivacyPage = (props) => (
        <Privacy {...props} />
);

export default PrivacyPage;

const fallbackLines = ['# Language not available', '## Privacy statement only available in English and Dutch'];

export async function getServerSideProps(context) {
    const lang = context.query?.lang;
    if (!lang || !['EN', 'NL'].includes(lang.toUpperCase())) return { props: { lines: fallbackLines } };
    try {
        const data = await fetch(`${gateway()}/info/privacy/${lang}`);
        const lines = await data.json();
        return { props: { lines } }

    } catch (error) {
        console.error(error);
        return { props: { lines: ['# Error', '## Something went wrong, try again later'] } };
    }
}