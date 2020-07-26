import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
    feature: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4, 8),
        // color: 'white',
    },
    icon: {
        marginBottom: theme.spacing(1),
        fontSize: 40,
        color: '#9b786f',
    },
}))

const featureList = [
    {
        icon: 'person_pin',
        title: 'Over ons',
        descriptions: [
            `Deze website is gemaakt door, en wordt beheerd door Wouter.`,
            `Speciaal om foto's van de jaarclub Blob te kunnen delen met elkaar.`,
            `Omdat andere "gratis" foto-websites maar een paar jaar meegaan.`,
            `Dat is naadje. Deze website lost dat op`
        ]
    },
    {
        icon: 'verified_user',
        title: 'Jouw privacy',
        descriptions: [
            `Een account maak je aan met je email-adres. Je kunt foto's opslaan en delen met anderen leden,
            in groepen en albums.`,
            `Voor de juristen onder u en andere paranoide lezers: meer info hieronder.`
        ]
    },
    {
        icon: 'contact_support',
        title: 'Ondersteuning',
        descriptions: [
            `Als je hulp wilt, stuur dan een berichtje aan Wouter. Die kan je vast helpen.`,
            `Als je geen contactgegevens van Wouter hebt, stuur dan een bericht aan een ander lid. 
            Hij of zij kent Wouter vast wel`
        ]
    },
]

const gridStyle = { paddingTop: '64px' };

const AboutUs = () => {
    const classes = useStyles()

    return (
        <Grid container
            direction="row"
            justify="center"
            alignItems="stretch"
            style={gridStyle}
        >
            {featureList.map(feature => (
                <Grid item key={feature.title} xs={12} md={4} className={classes.feature}>
                    <Icon color='secondary' className={classes.icon}>
                        {feature.icon}
                    </Icon>
                    <Typography variant="h5" gutterBottom>
                        {feature.title}
                    </Typography>
                    <Typography variant="body1" paragraph align='center'>
                        {feature.descriptions.map((description,i) => (
                            <React.Fragment key={i}>
                                {description}<br/>
                            </React.Fragment>
                        ))}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    )
}

export default AboutUs;