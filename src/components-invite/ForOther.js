import React from 'react';

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
}));

const ForOtherCard = ({ onLogout, isLoggedIn, onLogin }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Typography component="h1" variant="h4"
                align='center' gutterBottom>
                Mooi dat je een uitnodiging hebt
            </Typography>
            <img src='/img/invite_divider.png' alt='divider' width={64} />
            <Typography paragraph variant='subtitle1' align='center'>
                Maar deze uitnodiging is voor een bestaand lid van clubalmanac
            </Typography>
            {(!isLoggedIn) && <Typography variant='body1' align='center'>
                Je zou kunnen {' '}
                <Button type='submit' variant='contained' color='secondary' size='small' disableElevation
                    onClick={onLogin}>
                    inloggen
                </Button>{' '}om te checken of deze uitnodiging voor jou is<br />
                <br />
            </Typography>}
            {(isLoggedIn) && <Typography variant='body1' align='center'>
                En gericht aan <strong>een ander account</strong> dan waarmee je nu bent ingelogd<br />
                <br />
                Je zou kunnen {' '}
                <Button type='submit' variant='contained' color='secondary' size='small' disableElevation
                    onClick={onLogout}>
                    uitloggen
                </Button>{' '}en daarna met een ander account in te loggen<br />
                <br />
                Of neem anders contact op met de persoon van wie je deze uitnodiging kreeg
            </Typography>}
            <img src='/img/invite_divider.png' alt='divider' width={64} />
        </Paper>
    )
};

export default ForOtherCard;