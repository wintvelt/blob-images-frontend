import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Link from '../Link';

const useStyles = makeStyles(theme => ({
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        minHeight: '480px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        background: 'linear-gradient(355deg, rgba(155,120,111,.8) 10%, rgba(70,52,78,1) 90%)'
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(18),
            paddingRight: 0
        }
    },
}));

const Hero = (props) => {
    const { url, title, subTitle, linkText, linkUrl, children } = props;
    const safeUrl = encodeURI(url);
    const classes = useStyles();

    return (
        <Paper className={classes.mainFeaturedPost} elevation={0}
            style={{ backgroundImage: `url(${safeUrl})` }}>
            {/* Increase the priority of the hero background image */}
            {
                <img
                    style={{ display: 'none' }}
                    src={safeUrl}
                    alt="background"
                />
            }
            <div className={classes.overlay} />
            <Grid container alignItems='stretch' justify='space-around' spacing={8}>
                {title && <Grid item md={6}>
                    <div className={classes.mainFeaturedPostContent}>
                        <Typography component="h1" variant="h2" color="inherit" gutterBottom>
                            {title}
                        </Typography>
                        {subTitle &&
                            <Typography variant="h5" color="inherit" paragraph>
                                {subTitle}
                            </Typography>
                        }
                        {linkText &&
                            <Link variant="subtitle1" href={linkUrl}>
                                {linkText}
                            </Link>
                        }
                    </div>
                </Grid>}
                <Grid item md={6}>
                    {children}
                </Grid>
            </Grid>
        </Paper>
    )
};

export default Hero