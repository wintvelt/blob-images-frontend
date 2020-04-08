import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Avatar } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    quoteList: {
        backgroundColor: theme.palette.background.light,
        // paddingLeft: theme.spacing(4),
        // paddingRight: theme.spacing(4),
    },
    quote: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4),
    },
    avatar: {
        marginBottom: theme.spacing(2),
        filter: 'grayscale(100%)',
    },
    text: {
        fontStyle: 'italic',
    }
}))

const quoteList = [
    {
        avatar: 'img/me.jpg',
        name: 'Henk-Ahrend',
        quote:
            'Finally there is a simple and easy way to share those adventure photos with friends.'
    },
    {
        avatar: 'img/holiday.jpeg',
        name: 'Valerie',
        quote:
            'What a great way to enjoy the holiday pictures of my family.'
    },
    {
        avatar: 'img/me2.jpg',
        name: 'Hamilton',
        quote:
            'This is by far the simplest way to share those party pictures with my close friends.'
    },
    {
        avatar: 'img/surf.jpeg',
        name: 'Debbie',
        quote:
            'This definitely beats sending my pictures one a time on my mobile. So much easier.'
    },
]

const Features = () => {
    const classes = useStyles()

    return (
        <Grid container
            direction="row"
            justify="center"
            alignItems="flex-start"
            className={classes.quoteList}
            id='quotes'
        >
            {quoteList.map((quote) => {
                return <Grid item key={quote.name}
                    xs={6} md={3} className={classes.quote}
                >
                    <Avatar alt={quote.name} src={quote.avatar} className={classes.avatar}/>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                        {quote.name}
                    </Typography>
                    <Typography variant="subtitle1" paragraph align='center' className={classes.text}>
                        "{quote.quote}"
                    </Typography>
                </Grid>
            })}
        </Grid>
    )
}

export default Features