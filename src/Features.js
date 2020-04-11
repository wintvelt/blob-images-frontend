import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Image from './Image';

const useStyles = makeStyles(theme => ({
    featureList: {
        backgroundColor: theme.palette.background.paper,
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
        color: theme.palette.background.white,
        fontWeight: 'bold',
    },
}))

const featureList = [
    {
        imageUrl: 'img/get started.jpg',
        photographer: 'Connor Jalbert',
        photographerLink: 'connor_jalbert',
        title: 'Get started in less than a minute, no credit card required.',
        descriptions: [
            'With just an email address and a password you pick, '
            + 'you\'re good to go. No credit card required.',
            'Drop some photos in, to make your place look a bit more familiar ',
            'Send invites to others, who will get a simple link to also sign-up. '
        ],
        steps: ['Sign up', 'Upload photos', 'Invite others']
    },
    {
        imageUrl: 'img/album 2.jpg',
        NOphotographer: 'Roberto Nickson',
        NOphotographerLink: 'rpnickson',
        title: 'Share memories in your group, and pick your favorite photos.',
        descriptions: [
            'Create an album for each memory. Upload your own photos to share, ' +
            'and enjoy pictures from others.',
            'Drag and drop photos in any album. Add a title or description if you like. '
            + 'Notify your group to let them know there are new memories waiting for them.',
            'Pick your favorites, or see the favorite pictures from others in your group. '
            + 'And of course you download photos or albums if you want to have them printed.'
        ]
    },
]

const Features = () => {
    const classes = useStyles()

    return (
        <Grid container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            className={classes.featureList}
            id='features'
        >
            {featureList.map((feature, i) => {
                const { title, photographer, photographerLink, descriptions, steps } = feature;
                const direction = (i % 2 === 0) ? 'row' : 'row-reverse';
                const alignment = (i % 2 === 0) ? 'left' : 'right';
                return <Grid item key={feature.title} className={classes.feature}>
                    <Grid container
                        direction={direction}
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={4}>
                            <Image src={(feature.imageUrl)}
                                photographer={photographer}
                                photographerLink={photographerLink}
                                className={classes.image} />
                        </Grid>
                        <Grid item xs={5} className={classes.textBlock}>
                            <Typography variant="h4" color="textSecondary" gutterBottom align={alignment}>
                                {title}
                            </Typography>
                            {!steps && descriptions.map((text, i) => (
                                <Typography key={i} variant="body1" paragraph align={alignment}>
                                    {text}
                                </Typography>

                            ))}
                            {steps && steps.map((step, i) => (
                                <Grid container key={step} alignItems='baseline' spacing={3}
                                    style={{ marginTop: '8px' }}>
                                    <Grid item>
                                        <Avatar alt={'step ' + i + 1} className={classes.step}>{i + 1}</Avatar>
                                    </Grid>
                                    <Grid item style={{ flex: 1 }}>
                                        <Typography variant='h5'>{step}</Typography>
                                        <Typography variant='body1'>
                                            {descriptions[i]}
                                        </Typography>
                                    </Grid>
                                </Grid>
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