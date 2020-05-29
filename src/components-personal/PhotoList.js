import React, { useState } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Photo from './PhotoCard';
import { useApiData } from '../components-generic/DataProvider';

const useStyles = makeStyles(theme => ({
    container: {
        paddingBottom: theme.spacing(4),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        width: '100%',
    },
    tile: {
        position: 'relative',
        cursor: 'pointer',
        '&:hover img': {
            transform: 'scale(1.5)'
        },
    },
}));

const Empty = ({ message }) => {
    return <div style={{ height: '100%' }}>
        <Typography color='textSecondary'>{message}</Typography>
    </div>
}

const PhotoMenu = ({ anchorEl, handleClick, handleClose }) => {
    return (
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
    );
}

const PhotoList = (props) => {
    const { apiKey, source, empty, menu } = props;
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const data = useApiData(apiKey, source);
    const photos = data.data || [1, 2, 3].map(id => ({ id, isLoading: true }));

    const classes = useStyles();
    const isLarge = useMediaQuery(theme => theme.breakpoints.up('md'));
    const isMedium = useMediaQuery(theme => theme.breakpoints.up('sm'));
    const cols = isLarge ? 4 : isMedium ? 3 : 2;
    const cellHeight = (isLarge || isMedium) ? 180 : 100;
    return <div className={classes.container}>
        <GridList cellHeight={cellHeight} cols={cols} className={classes.gridList}>
            {photos.map(photo => {
                return <GridListTile key={photo.id} className={classes.tile}>
                    <Photo
                        photo={photo}
                        isSmall={(!isLarge && !isMedium)}
                        {...props}
                        onClickMenu={menu && handleClick}
                    />
                </GridListTile>
            })}
        </GridList>
        {menu && <PhotoMenu anchorEl={anchorEl} handleClick={handleClick} handleClose={handleClose} />}
        {empty && (photos.length === 0) && <Empty message={empty} />}
    </div>
}

export default PhotoList;