import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

import Hero from '../src/components-home/Hero';
import HeroTitle from '../src/components-home/Hero-Title';
import Benefits from '../src/components-home/Benefits'
import PublicPage from '../src/components-generic/PublicPage';

const styles = {
    paper: {
        padding: '24px',
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '16px'
    },
    icon: {
        color: '#9b786f',
        fontSize: '40px',
        marginRight: '24px'
    }
}

const Home = () => {
    return (
        <main>
            <Hero
                url='/cover_2.jpg'
            >
                <Grid item md={1} />
                <Grid item md={4}>
                    <HeroTitle
                        title="Foto's delen met je club"
                        subTitle='In besloten kring'
                    />
                </Grid>
                <Grid item md={1} />
                <Grid item md={5}>
                    <Paper style={styles.paper}>
                        <Icon style={styles.icon}>mail</Icon>
                        <div>
                            <Typography variant='h4' gutterBottom>
                                Alleen op uitnodiging
                            </Typography>
                            <Typography variant='body1' gutterBottom>
                                Voorlopig is Clubalmanac alleen beschikbaar op uitnodiging.
                            </Typography>
                            <Typography variant='body1' gutterBottom>
                                Ben je getipt om je aan te melden?
                                Vraag dan of hij of zij je vanuit Clubalmanac uitnodigt.
                                Je ontvangt dan een persoonlijke mail waarmee je lid kunt worden.
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
                <Grid item md={1} />
            </Hero>
            <Benefits />
        </main>
    )
}

const Page =  () => (
    <PublicPage>
        <Home />
    </PublicPage>
);

export default Page;