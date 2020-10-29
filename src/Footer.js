import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from './components-generic/Link';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

const dividerStyle = { backgroundColor: 'darkgrey' };

const preventDefault = e => e.preventDefault;

function Copyright(props) {
    return (
        <Container maxWidth='sm'>
            <Divider variant='middle' style={dividerStyle} />
            <Typography variant="body2" align="center" className={props.className} gutterBottom>
                {'© '}Clubalmanac{' '}
                {new Date().getFullYear()}
                {' | '}
                <Link href='/about#privacy' className={props.className}>Privacy statement</Link>{' | '}
                <Link href='/about#cookies' className={props.className}>Cookies</Link>{' | '}
                <Link onClick={preventDefault} href='/termsandconditions' target='_blank' rel='noopener noreferrer' className={props.className}>
                    Algemene voorwaarden
                </Link>
            </Typography>
        </Container>
    );
}

const useStyles = makeStyles((theme) => ({
    footer: {
        marginTop: '144px',
        padding: theme.spacing(6, 6, 6, 6),
        // backgroundColor: theme.palette.background.light,
        // background: 'linear-gradient(0deg, rgba(70,52,78,1) 00%, rgba(155,120,111,1) 90%)'
    },
    white: {
        color: theme.palette.text.secondary,
    }
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Typography variant="subtitle1" align='center' className={classes.white} gutterBottom>
                <Link href='/about' className={classes.white}>Over ons</Link>{' | '}
                <Link href='/about#support' className={classes.white}>Ondersteuning</Link>{' | '}
                <Link href='/about' className={classes.white}>Contact</Link>
            </Typography>
            <Copyright className={classes.white} />
            <Typography variant="body2" align='center' className={classes.white} gutterBottom>
                Versie {process.env.NEXT_PUBLIC_VERSION || '(local new)'}
            </Typography>
        </footer>
    );
}