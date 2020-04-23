import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from './Link';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

function Copyright() {
    return (
        <Container maxWidth='sm'>
            <Divider variant='middle' />
            <Typography variant="body2" color="textSecondary" align="center">
                {'© '}Photo Duck{' '}
                {new Date().getFullYear()}
                {' | '}
                <Link href='#' color="textSecondary">Privacy statement</Link>{' | '}
                <Link href='#' color="textSecondary">Cookies</Link>
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
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Typography variant="subtitle1" color="textSecondary" align='center' gutterBottom>
                <Link href='#' color="textSecondary">About us</Link>{' | '}
                <Link href='#' color="textSecondary">Support</Link>{' | '}
                <Link href='#' color="textSecondary">Contact</Link>
            </Typography>
            <Copyright />
        </footer>
    );
}