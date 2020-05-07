import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Link from '../components-generic/UnstyledLink';

const useStyles = makeStyles(theme => ({
    container: {
        paddingBottom: theme.spacing(4),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    tile: {
        position: 'relative',
        '&:hover img.MuiGridListTile-imgFullHeight': {
            transform: 'scale(1.5) translateX(-30%)'
        },
        '&:hover img.MuiGridListTile-imgFullWidth': {
            transform: 'scale(1.5) translateY(-30%)'
        },
    },
    icon: {
        color: 'white',
        width: theme.spacing(4),
        height: theme.spacing(4),
        padding: 0,
    },
    img: {
        transition: 'transform .5s ease',
    }
}));

const photos = [
    {
        id: 1, author: 'Eeb',
        title: 'cover image met een iets langere titel',
        src: '/cover_2.jpg'
    },
    {
        id: 2, author: 'Eeb',
        title: 'cover image',
        src: '/cover_2.jpg'
    },
    {
        id: 3, author: 'Eeb',
        title: '',
        src: '/cover_2.jpg'
    },
    {
        id: 4, author: 'Eeb',
        title: 'cover image',
        src: '/cover_2.jpg'
    },
    {
        id: 5, author: 'Eeb',
        title: 'cover image',
        src: '/cover_2.jpg'
    },
    {
        id: 6, author: 'Eeb',
        title: 'cover image',
        src: '/cover_2.jpg'
    },

];

const PhotoGroup = () => {
    const classes = useStyles();
    return <div className={classes.container}>
        <GridList cellHeight={180} cols={4} className={classes.gridList}>
            {photos.map(photo => {
                const { src, title, author, id, cols } = photo;
                return <GridListTile key={id} className={classes.tile} cols={cols}>
                    <img src={src} alt={title} className={classes.img} />
                    <Link href='#' style={{
                        position: 'absolute', top: 0, left: 0, width: '100%',
                        height: '100%'
                    }} />
                    <GridListTileBar
                        title={title}
                        subtitle={<span>by: {author}</span>}
                        actionIcon={
                            <div style={{ display: 'flex' }}>
                                <IconButton aria-label={`mark ${title} as favorite`}
                                    className={classes.icon}>
                                    <Icon fontSize='small'>favorite_border</Icon>
                                </IconButton>
                                <IconButton aria-label={`info about ${title}`}
                                    className={classes.icon}>
                                    <Icon fontSize='small'>more_vert</Icon>
                                </IconButton>
                            </div>
                        }
                    />
                </GridListTile>
            })}
        </GridList>
    </div>
}

export default PhotoGroup;