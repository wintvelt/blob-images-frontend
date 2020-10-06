import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Image from '../Image';

const useStyles = makeStyles(theme => ({
    featureList: {
        background: theme.palette.background.light,
    },
    feature: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        height: '640px',
        width: '100%',
        objectFit: 'cover',
    },
    textBlock: {
        padding: theme.spacing(4),
    },
    icon: {
        marginBottom: theme.spacing(1),
        fontSize: 40,
        color: '#9b786f',
    },
    step: {
        backgroundColor: theme.palette.background.default,
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        fontWeight: 'bold',
    },
}))

const featureList = [
    {
        imageUrl: '/img/private.jpg',
        photographer: 'Khamkéo Vilaysing',
        photographerLink: 'mahkeo',
        title: 'Jouw privacy',
        id: 'privacy',
        descriptions: [
            `Om lid te worden moet je wat gegevens delen met ons:`,
            `✅ email adres - om een account aan te kunnen maken`,
            `✅ naam - dan weten leden wie je bent (duh)`,
            `✅ groepen en albums - die je kunt maken om foto's te delen`,
            `✅ foto's - die je deelt met anderen`,
            `Al deze gegevens zijn uitsluitend zichtbaar voor jou en voor andere leden in de 
            betreffende groep(en). En voor de beheerder van deze website (Wouter dus)`,
            `Daarbuiten zijn deze gegevens voor helemaal niemand zichtbaar, en worden met niemand 
            gedeeld. En zo heurt het ook.`,
            `Daarnaast zijn er nog diverse mores, maar die zijn uiteraard nergens beschreven.`
        ],
    },
    {
        imageUrl: '/img/german_castle.jpg',
        photographer: 'Leonard von Bibra',
        photographerLink: 'leonardvonbibra',
        title: 'Data in Frankfurt',
        id: 'data',
        descriptions: [
            `Alle gegevens staan op servers van Amazon Web Services in Frankfurt. In de EU dus, ook na de Brexit.`,
            `Uitsluitend de beheerder (Wouter dus) heeft toegang tot die servers. Verder niemand.`,
            `Via de website hebben leden - als ze zijn ingelogd - toegang tot hun eigen groepen en albums, 
            en alle foto's die daar zijn gedeeld.`,
            `Je kunt op elk moment je gegevens bekijken en wijzigen. En als je wilt, kan je ook je 
            complete account verwijderen. Al je foto's worden dan ook definitief gewist van de website.`,
        ]
    },
    {
        imageUrl: '/img/beer.jpg',
        photographer: 'pablo capra',
        photographerLink: 'papra',
        title: 'Cookies',
        id: 'cookies',
        descriptions: [
            `Er is maar 1 cookie die op je computer wordt opgeslagen.`,
            `Dat is de cookie die bewaart dat je bent ingelogd. Zodat je niet elke keer opnieuw moet inloggen.`,
            `Geen tracking cookies, analytics of andere onzin.`
        ]
    },
    {
        imageUrl: '/img/wouter.jpeg',
        title: 'Team',
        id: 'team',
        descriptions: [
            `Wouter heeft deze website gemaakt. Altijd al een beetje een nerd geweest.`,
            `Een uit de hand gelopen hobby eigenlijk, net als het penningmeesterschap van de jaarclub.`,
            `Deze website kan in principe altijd blijven bestaan. Ook in de generaties na ons.`,
            `De bedoeling is dat hij gratis blijft, maar geen garanties (zoals in het leven).`
        ]
    }
];

const gutterTop = { marginTop: '8px' };
const flexStyle = { flex: 1 };

const Features = () => {
    const classes = useStyles()

    return (
        <Grid container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            className={classes.featureList}
        >
            {featureList.map((feature, i) => {
                const { title, photographer, photographerLink, descriptions, steps, id } = feature;
                const direction = (i % 2 === 0) ? 'row' : 'row-reverse';
                const alignment = (i % 2 === 0) ? 'left' : 'right';
                return <Grid item key={feature.title} className={classes.feature}>
                    <Grid container
                        direction={direction}
                        justify="center"
                        alignItems="center"
                        id={id}
                    >
                        <Grid item md={4}>
                            <Image src={(feature.imageUrl)}
                                photographer={photographer}
                                photographerLink={photographerLink}
                                className={classes.image} />
                        </Grid>
                        <Grid item md={5} className={classes.textBlock}>
                            <Typography variant="h4" gutterBottom align={alignment}>
                                {title}
                            </Typography>
                            {descriptions.map((text, i) => (
                                <Typography variant="body1" key={i}
                                    paragraph align={alignment}>
                                    {text}
                                </Typography>
                            ))}
                        </Grid>
                        <Grid item xs={3} />
                    </Grid>
                </Grid>
            })}
        </Grid >
    )
}

export default Features