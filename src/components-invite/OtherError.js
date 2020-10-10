import React from 'react';

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

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

const OtherErrorCard = ({ invite }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Typography component="h1" variant="h4" color='error'
                align='center' gutterBottom>
                Mooi dat je een uitnodiging hebt
            </Typography>
            <img src='/img/invite_divider.png' alt='divider' width={64} />
            <Typography paragraph variant='subtitle1' color='error'>
                Maar op dit moment kunnen we deze uitnodiging niet terugvinden
            </Typography>
            <Typography variant='body1' align='center' gutterBottom>
                Mogelijke verklaringen hiervoor:<br />
                <br />
                ⦾ De uitnodiging is al eerder geaccepteerd of afgewezen<br />
                <em>niks aan te doen helaas</em><br /><br />
                ⦾ De uitnodiging is verlopen (uitnodigingen zijn 30 dagen geldig)<br />
                <em>neem contact op met het lid dat je uitnodigde</em><br /><br />
                ⦾ Onze services zijn momenteel niet bereikbaar<br />
                <em>je kunt het later nog eens proberen</em><br /><br />
                ⦾ De link is niet correct<br />
                <em>je kunt het opnieuw proberen vanuit de mail met de uitnodiging</em><br />
                <br />
            </Typography>
            <img src='/img/invite_divider.png' alt='divider' width={64} />
        </Paper>
    )
};

export default OtherErrorCard;