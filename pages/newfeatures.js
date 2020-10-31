import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Hero from '../src/components-home/Hero';
import HeroTitle from '../src/components-home/Hero-Title';
import PublicPage from '../src/components-generic/PublicPage';
import { useUser, useUserValue } from '../src/data/userData';
import { useSetLoadingPath } from '../src/data/loadingData';
import Benefits from '../src/components-home/Benefits';
import FeatureDialog from '../src/components-generic/FeatureDialog';
import { useFeatures, useReloadFeatures } from '../src/data/featuresData';
import FeatureList from '../src/components-generic/FeatureList';

const credit = {
    name: 'freestocks',
    nameLink: 'https://unsplash.com/@freestocks?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    link: 'https://unsplash.com/s/photos/library?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText'
};

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
        <Icon style={styles.icon}>announcement</Icon>
        <div>
            <Typography variant='h4' gutterBottom>
                Binnenkort?
            </Typography>
            <Typography variant='body1' gutterBottom>
                Op deze pagina de wensen van leden voor nieuwe dingen.
                Als je lid bent, log dan in. Dan kun je stemmen, en eventuele nieuwe wensen
                indienen.
            </Typography>
        </div>
    </Paper>
);

const OpenMessage = ({onClick}) => {
    return <Paper style={styles.paper}>
        <Icon style={styles.icon}>announcement</Icon>
        <div>
            <Typography variant='h4' gutterBottom>
                Binnenkort?
            </Typography>
            <Typography variant='body1' gutterBottom>
                Hieronder wensen van leden voor nieuwe dingen op clubalmanac.
                Stem op wensen van anderen.
                Of doe zelf een wens..
            </Typography>
            <Button color='secondary' variant='contained' onClick={onClick}>
                Ik zou graag zien..
            </Button>
        </div>
    </Paper>
}

const FeatsMain = () => {
    const user = useUserValue();
    const features = useFeatures();
    const reloadFeatures = useReloadFeatures();
    const [dialogOpen, setDialogOpen] = useState(false);
    const hasLoaded = !user.isAuthenticating;
    const isLoggedIn = user.isAuthenticated;

    useEffect(() => {
        reloadFeatures();
    }, 
    [user.isAuthenticated]);

    const onClick = () => setDialogOpen(true);
    const onClose = () => setDialogOpen(false);

    return (
        <main>
            <Hero
                url='/img/gifts.jpg'
                credit={credit}
            >
                <Grid item md={1} />
                <Grid item md={4}>
                    <HeroTitle
                        title="Nieuw"
                        subTitle="verlanglijst van leden"
                    />
                </Grid>
                <Grid item md={1} />
                <Grid item md={5}>
                    {hasLoaded && !isLoggedIn && <ClosedMesssage />}
                    {hasLoaded && isLoggedIn && <OpenMessage onClick={onClick} />}
                </Grid>
                <Grid item md={1} />
            </Hero>
            <FeatureList />
            <FeatureDialog open={dialogOpen} onClose={onClose} />
        </main>
    )
}

const FeatsPage = () => (
    <PublicPage>
        <FeatsMain />
    </PublicPage>
);

export default FeatsPage;