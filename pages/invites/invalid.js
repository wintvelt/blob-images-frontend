import React from 'react';
import Hero from '../../src/components-home/Hero';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'relative',
        backgroundColor: '#fff',
        color: theme.palette.secondary.main,
        padding: theme.spacing(4),
        marginTop: theme.spacing(12),
        marginRight: '20%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}))

const InvalidInvite = () => {
    const classes = useStyles();
    const title = 'Oops';
    const subTitle = 'This invite is not valid'
    const paragraph = <>
        {[
            'Maybe the invite has expired (invites are valid for 30 days)',
            'Or, the invite was already accepted',
            'Or, an invite with this id simply does not exist'
        ].map((line, i) => (
            <Typography key={i} variant='body1' gutterBottom>{line}</Typography>))
        }
    </>

    return (
        <main>
            <Hero
                url='/img/envelope.jpg'
                title={title}
                subTitle={subTitle}
                paragraph={paragraph}
            >
                <Paper className={classes.paper}>
                    <img src='/img/closed2.jpg' style={{ position: 'relative', width: '100%' }} />
                </Paper>
            </Hero>
        </main>
    )
}

export default InvalidInvite