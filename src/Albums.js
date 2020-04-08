import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Hidden from '@material-ui/core/Hidden'

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex'
    },
    cardDetails: {
        flex: 1
    },
    cardMedia: {
        width: 160
    }
}))

const featuredPosts = [
    {
        title: 'Featured post',
        date: 'Nov 12',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.'
    },
    {
        title: 'Post title',
        date: 'Nov 11',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.'
    }
]

const Features = () => {
    const classes = useStyles()

    return (
        <Container>
            {/* Sub featured posts */}
            <Grid container spacing={4}>
                {featuredPosts.map(post => (
                    <Grid item key={post.title} xs={12} md={6}>
                        <CardActionArea component="a" href="#">
                            <Card className={classes.card}>
                                <div className={classes.cardDetails}>
                                    <CardContent>
                                        <Typography component="h2" variant="h5">
                                            {post.title}
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            {post.date}
                                        </Typography>
                                        <Typography variant="subtitle1" paragraph>
                                            {post.description}
                                        </Typography>
                                        <Typography variant="subtitle1" color="primary">
                                            Continue reading...
                                            </Typography>
                                    </CardContent>
                                </div>
                                <Hidden xsDown>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title="Image title"
                                    />
                                </Hidden>
                            </Card>
                        </CardActionArea>
                    </Grid>
                ))}
            </Grid>
            {/* End sub featured posts */}
        </Container>
    )
}

export default Features