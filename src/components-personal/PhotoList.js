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
import { useUser } from '../components-generic/UserContext';

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

const PhotoMenu = ({ anchor, handleClose }) => {
    const { user, saveProfile } = useUser(true);
    const onSetProfilePic = async () => {
        const name = user.profile.name;
        saveProfile(name, anchor.url);
        handleClose();
    };
    return (
        <Menu
            id="simple-menu"
            anchorEl={anchor.el}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            open={Boolean(anchor.el)}
            onClose={handleClose}
        >
            <MenuItem onClick={onSetProfilePic}>Set as profile picture</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
    );
}

const PhotoList = (props) => {
    const { apiKey, source, empty, menu } = props;
    const [anchor, setAnchor] = useState({ el: null });

    const handleClick = (e, photoId, url) => {
        e.preventDefault();
        e.stopPropagation();
        setAnchor({ el: e.currentTarget, photoId, url });
    };

    const handleClose = () => {
        setAnchor({ el: null });
    };

    const { data } = useApiData(apiKey, source, true);
    const photos = data || [1, 2, 3].map(id => ({ id, isLoading: true }));

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
        {menu && <PhotoMenu anchor={anchor} handleClick={handleClick} handleClose={handleClose} />}
        {empty && (photos.length === 0) && <Empty message={empty} />}
    </div>
}

export default PhotoList;