import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    root: {
        backgroundColor: theme.palette.background.grey,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
        color: theme.palette.background.white,
    },
    mainContent: {
        paddingBottom: theme.spacing(12),
    },
    cardHeader: {
        color: theme.palette.background.white,
        backgroundColor:
            theme.palette.background.default,
        // theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
        // color: theme.palette.secondary.main
    },
    star: { color: theme.palette.secondary.main },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
}));

const tiers = [
    {
        title: 'Free forever',
        price: '0',
        description:
            ['unlimited group invites', 'unlimited albums', '2 groups', '10 GB of storage', 'Email support'],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
        buttonColor: 'primary'
    },
    {
        title: 'Premium',
        subheader: 'Most popular',
        price: '5',
        description:
            ['unlimited group invites', 'unlimited albums', '10 groups', '20 GB of storage', 'Priority support'],
        buttonText: 'Get Premium',
        buttonVariant: 'contained',
        buttonColor: 'secondary'
    },
    {
        title: 'Pro',
        price: '25',
        description:
            ['unlimited group invites', 'unlimited albums', 'unlimited groups', '50 GB of storage', 'Priority support'],
        buttonText: 'Contact us',
        buttonVariant: 'outlined',
        buttonColor: 'primary'
    },
];
export default function Pricing() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* Hero unit */}
            <Container maxWidth="sm" className={classes.heroContent}
                id='pricing'>
                <Typography component="h1" variant="h2" align="center" gutterBottom>
                    Pricing
                </Typography>
                <Typography variant="h5" align="center" component="p">
                    Get started for free.
                    Want more? Sign-up for our premium service.
                 </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main" className={classes.mainContent}>
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    subheaderTypographyProps={{ align: 'center', color: 'secondary' }}
                                    action={tier.title === 'Premium' ?
                                        <Icon className={classes.star}>star</Icon> : null
                                    }
                                    className={classes.cardHeader}
                                />
                                <CardContent>
                                    <div className={classes.cardPricing}>
                                        <Typography component="h2" variant="h3" color="textPrimary">
                                            €{tier.price}
                                        </Typography>
                                        <Typography variant="h6" color="textSecondary">
                                            /mo
                                        </Typography>
                                    </div>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography component="li" variant="subtitle1" align="center" key={line}
                                            color='primary'>
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button fullWidth variant={tier.buttonVariant} color={tier.buttonColor}>
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}