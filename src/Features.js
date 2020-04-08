import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
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
}))

const featureList = [
    {
        imageUrl: 'img/get started.jpg',
        photographer: 'Connor Jalbert',
        photographerLink: 'connor_jalbert',
        title: 'Get started in less than a minute, no credit card required.',
        descriptions: [
            'To try it out, just sign up. With just an email address and a password you pick, '
            + 'you will be good to go. No credit details required. '
            + 'You can try it out for 90 days, or longer if you need.',
            'Register a name for your group of family, friends, or team. '
            + 'Drop some photos in if you want, to make your place look a bit more familiar ',
            'Send invites to others, who will get a simple link to also sign-up. '
            + 'And when they do, you will be automatically '
            + 'sharing the same photo environment.'
        ]
    },
    {
        imageUrl: 'img/album.jpg',
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
                const direction = (i % 2 === 0) ? 'row' : 'row-reverse';
                const alignment = (i % 2 === 0) ? 'left' : 'right';
                return <Grid item key={feature.title} className={classes.feature}>
                    <Grid container
                        direction={direction}
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Grid item xs={4}>
                            <Image src={(feature.imageUrl)}
                                photographer={feature.photographer}
                                photographerLink={feature.photographerLink}
                                className={classes.image} />
                        </Grid>
                        <Grid item xs={5} className={classes.textBlock}>
                            <Typography variant="h4" color="textSecondary" gutterBottom align={alignment}>
                                {feature.title}
                            </Typography>
                            {feature.descriptions.map((text, i) => (
                                <Typography key={i} variant="body1" paragraph align={alignment}>
                                    {text}
                                </Typography>

                            ))}
                        </Grid>
                        <Grid item xs={3} />
                    </Grid>
                </Grid>
            })}
        </Grid>
    )
}

export default Features