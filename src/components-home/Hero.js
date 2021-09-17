import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles(theme => ({
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        minHeight: '256px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: theme.spacing(0, 0, 2, 0),
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        background: 'linear-gradient(355deg, rgba(155,120,111,.8) 10%, rgba(90,85,96,1) 90%)',
    },
    credit: {
        position: 'absolute',
        height: '16px',
        right: theme.spacing(1),
        bottom: theme.spacing(1),
        color: '#ffffffc0',
    },
    link: {
        textDecorationDolor: 'inherit',
        color: 'inherit'
    }
}));

// 

const hiddenStyle = { display: 'none' };
const gutterBottom = { marginBottom: '32px' };
const relativeStyle = { position: 'relative' };

const Credit = ({ name, nameLink, link }) => {
    const classes = useStyles();
    return <div className={classes.credit}>
        <span>
            Photo door{' '}
            <a className={classes.link} href={nameLink} target='_blank' rel='noopener noreferrer'>{name}</a>
            {' '}op{' '}
            <a className={classes.link} href={link} target='_blank' rel='noopener noreferrer'>Unsplash</a>
        </span>
    </div>
}

const Hero = (props) => {
    const { url, children, credit } = props;
    const safeUrl = encodeURI(url);
    const classes = useStyles();
    const background = url && { backgroundImage: `url(${safeUrl})` };

    return (
        <Paper className={classes.mainFeaturedPost} elevation={0}
            style={background}>
            {/* Increase the priority of the hero background image */}
            {url &&
                <img
                    style={hiddenStyle}
                    src={safeUrl}
                    alt="background"
                />
            }
            <div className={classes.overlay} />
            {credit && <Credit {...credit} />}
            <Toolbar style={gutterBottom} />
            <Grid container alignItems='center' justifyContent='center' spacing={1}
                style={relativeStyle}>
                {children}
            </Grid>
        </Paper>
    )
};

export default Hero