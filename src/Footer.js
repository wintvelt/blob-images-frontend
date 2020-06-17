import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from './components-generic/Link';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

const dividerStyle = { backgroundColor: 'darkgrey' };

function Copyright(props) {
    return (
        <Container maxWidth='sm'>
            <Divider variant='middle' style={dividerStyle} />
            <Typography variant="body2" align="center" className={props.className}>
                {'© '}Photo Duck{' '}
                {new Date().getFullYear()}
                {' | '}
                <Link href='#' className={props.className}>Privacy statement</Link>{' | '}
                <Link href='#' className={props.className}>Cookies</Link>
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
        color: 'white',
    }
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Typography variant="subtitle1" align='center' className={classes.white} gutterBottom>
                <Link href='#' className={classes.white}>About us</Link>{' | '}
                <Link href='#' className={classes.white}>Support</Link>{' | '}
                <Link href='#' className={classes.white}>Contact</Link>
            </Typography>
            <Copyright className={classes.white} />
        </footer>
    );
}