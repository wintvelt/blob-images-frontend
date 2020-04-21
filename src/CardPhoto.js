import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import CardActionArea from '@material-ui/core/CardActionArea';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import Link from './UnstyledLink';

const useStyles = makeStyles(theme => ({
    tile: {
        // height: 180,
        // width: 'auto',
    },
}));

const CardPhoto = (props) => {
    const { src, title, author, id, cols } = props;
    const classes = useStyles();
    return <GridListTile className={classes.tile} cols={cols}>
        {/* <CardActionArea> */}
        <img src={src} alt={title} />
        <GridListTileBar
            title={title}
            subtitle={<span>by: {author}</span>}
            actionIcon={
                <IconButton aria-label={`info about ${title}`} className={classes.icon}>
                    <Icon>info</Icon>
                </IconButton>
            }
        />
        {/* </CardActionArea> */}
    </GridListTile>
}

export default CardPhoto;