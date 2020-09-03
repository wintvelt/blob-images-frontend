import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Hero from '../src/components-home/Hero';
import HeroTitle from '../src/components-home/Hero-Title';
import Benefits from '../src/components-home/Benefits'
import PublicPage from '../src/components-generic/PublicPage';
import { useUser } from '../src/data/userData';
import { useSetLoadingPath } from '../src/data/loadingData';

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

const ClosedMesssage = () => (
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
);

const OpenMessage = () => {
    const setLoadingPath = useSetLoadingPath();
    const onClick = () => {
        setLoadingPath('/personal/groups');
    };
    return <Paper style={styles.paper}>
        <Icon style={styles.icon}>emoji_people</Icon>
        <div>
            <Typography variant='h4' gutterBottom>
                Welkom terug!
            </Typography>
            <Typography variant='body1' gutterBottom>
                Mooi dat je de Clubalmanac bezoekt.
            </Typography>
            <Typography variant='body1' gutterBottom>
                Check weer eens je groepen, om te zien of je clubgenoten weer wat foto's hebben
                gedeeld.
            </Typography>
            <Button color='secondary' variant='contained' onClick={onClick}>
                Ga naar mijn groepen
            </Button>
        </div>
    </Paper>
}

const Home = () => {
    const { user } = useUser();
    const isLoggedIn = user.isAuthenticated;
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
                    {!isLoggedIn && <ClosedMesssage />}
                    {isLoggedIn && <OpenMessage />}
                </Grid>
                <Grid item md={1} />
            </Hero>
            <Benefits />
        </main>
    )
}

const Page = () => (
    <PublicPage>
        <Home />
    </PublicPage>
);

export default Page;