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

const termsList = [
    {
        // imageUrl: '/img/freedom.png',
        // photographer: 'Clément Falize',
        // photographerLink: 'centelm',
        title: 'de kleine lettertjes',
        id: 'terms',
        descriptions: [
            `Aan elke verbintenis in het leven zitten helaas voorwaarden vast. `,
            `Het liefst zouden we geen regeltjes maken, maar bureaucratie is overal, en er zijn wetten en regels `+
            `waar iedereen - ook wij - aan moeten voldoen. Voordeel is dan weer wel dat `+
            `duidelijk is wat de afspraken zijn. Dat dan wel. En nee: hierover valt niet te onderhandelen.`,
            `Als je lid wordt van clubalmanac ga jij akkoord met het volgende`,
            `‣ Je bent er ok mee dat jouw naam, eventuele profiel pic en je email adres gedeeld worden met andere leden` +
            ' (uiteraard alleen in de groepen waar je lid van bent)',
            `‣ Alle foto\'s die je deelt op clubalmanac blijven jouw eigendom`,
            `‣ Je belooft dat je geen inbreuk maakt op de privacy van andere leden`,
            `‣ Je belooft dat je geen inbreuk maakt op de privacy van andere leden`,
            'Je bent zelf verantwoordelijk voor de inhoud van de foto\'s die je deelt, wat onder meer betekent',
            `‣ Dat jij de rechten op de foto\'s hebt, of ze in ieder geval van de eigenaar mag delen`,
            `‣ Dat andere mensen op de foto ook ok zijn met de inhoud. Zo niet, dan kunnen ze jou daarop aanspreken.`,
            `‣ Dat de foto\'s geen illegale of verwerpelijke inhoud hebben.`,
            '----',
            `Clubalmanac belooft`,
            `‣ Dat we de site zo veel mogelijk in de lucht houden`,
            `‣ Dat de site fatsoenlijk werkt. Dat je foto's kunt delen, groepen en albums kunt maken, en anderen kunt uitnodigen`,
            `‣ Dat we je foto\'s en andere gegevens veilig opslaan. Dat we backups maken op geregelde tijden.`,
            `‣ Dat we je foto\'s en andere gegevens beschermen tegen nare zaken van buiten: dus alleen voor jou toegankelijk, `+
            'en voor andere leden waarmee je in groepen spullen deelt',
            `‣ Dat je op elk moment je account kunt opheffen. En dan worden ook al je gegevens definitief verwijderd`,
            `‣ Dat de website gratis is`,
            `Maar dat is geen garantie. Het kan zijn dat de website een keer uit de lucht is, of soms niet goed werkt. ` +
            'We doen ons best, maar dan kan je geen rechten aan ontlenen.',
            `En clubalmanac houdt wel het recht om`,
            `‣ Een maandelijks bedrag voor het lidmaatschap te gaan vragen. Clubalmanac maakt kosten. Die kunnen omhoog gaan. En alleen de zon blijft altijd gratis. ` +
            'Als het lidmaatschap betaald wordt, dan krijg je wel een redelijke termijn om te beslissen, en je kunt uiteraard altijd zonder verplichtingen opzeggen.',
            `‣ De werking van de site te veranderen. Het kan in het ergste geval gebeuren dat we kappen. Ook dan krijg je wel een redelijke termijn om je hierop voor te bereiden.`,
            `‣ Als je misdraagt kan je verbannen worden van clubalmanac. Bijvoorbeeld als je je niet aan de afspraken op deze pagina houdt, of als ` +
            `je je anderszins niet netjes bent. Je krijgt daarvan vooraf bericht, en een redelijke termijn om spullen op te ruimen. ` +
            'Maar er is geen mogelijkheid tot beroep of arbitrage of zo.',
        ],
    },
];

const gutterTop = { marginTop: '8px' };
const flexStyle = { flex: 1 };

const Terms = () => {
    const classes = useStyles()

    return (
        <Grid container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            className={classes.featureList}
        >
            {termsList.map((feature, i) => {
                const { title, photographer, photographerLink, descriptions, steps, id } = feature;
                const direction = (i % 2 === 0) ? 'row' : 'row-reverse';
                const alignment = (i % 2 === 0) ? 'left' : 'right';
                const hasPhoto = feature.imageUrl;
                return <Grid item key={feature.title} className={classes.feature}>
                    <Grid container
                        direction={direction}
                        justify="center"
                        alignItems="center"
                        id={id}
                    >
                        <Grid item md={(hasPhoto)? 4 : 1}>
                            {(hasPhoto) && <Image src={(feature.imageUrl)}
                                photographer={photographer}
                                photographerLink={photographerLink}
                                className={classes.image} />}
                        </Grid>
                        <Grid item md={(hasPhoto)? 5 : 10} className={classes.textBlock}>
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
                        <Grid item xs={(hasPhoto)? 3: 1} />
                    </Grid>
                </Grid>
            })}
        </Grid >
    )
}

export default Terms