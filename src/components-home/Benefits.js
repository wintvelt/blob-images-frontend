import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
    feature: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(12,8,8,8),
        color: 'white',
    },
    icon: {
        marginBottom: theme.spacing(1),
        fontSize: 40,
        color: '#9b786f',
    },
}))

const featureList = [
    {
        icon: 'verified_user',
        title: 'Safe',
        description:
            'Your photos will always be visible only to you and the ones you trust. ' +
            ' Share them with your friends, your family, ' +
            'or with your team. Safely and securily stored in a trusted environment.'
    },
    {
        icon: 'touch_app',
        title: 'Simple',
        description:
            'Just photos. No ads, no spam, clutter. Simple drag and drop. Easy upload and download. ' +
            'Straightforward sharing. The basics you need, and nothing else.'
    },
    {
        icon: 'person_pin',
        title: 'Personal',
        description:
            'Make it your own. Add albums, titles, and pick favorites. ' +
            'The people you invite get a personal message, to join just your group. ' +
            'No need for everyone to be on whatever social platform.'
    },
]

const Benefits = () => {
    const classes = useStyles()

    return (
        <Container>
            {/* Sub featured posts */}
            <Grid container
                direction="row"
                justify="center"
                alignItems="stretch"
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
                            {feature.description}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            {/* End sub featured posts */}
        </Container>
    )
}

export default Benefits