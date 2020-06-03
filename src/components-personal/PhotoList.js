import React, { useState } from 'react';
import { API } from 'aws-amplify';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSnackbar } from 'notistack';

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
    const { enqueueSnackbar } = useSnackbar();
    const { reloadData } = useApiData('myPhotos', '/photos', true)
    const onSetProfilePic = async () => {
        const name = user.profile.name;
        try {
            saveProfile(name, anchor.url);
            enqueueSnackbar('profile picture set', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('could not set profile picture', { variant: 'error' });
        }
        handleClose();
    };
    const onDelete = async () => {
        try {
            const path = `/photos/${anchor.photoId}`;
            await API.del('blob-images', path);
            enqueueSnackbar('photo deleted', { variant: 'success' });
            reloadData();
        } catch (error) {
            console.log(error);
            enqueueSnackbar('could not delete picture', { variant: 'error' });
        }
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
            <MenuItem onClick={onDelete}>Delete</MenuItem>
        </Menu>
    );
}

const PhotoList = (props) => {
    const { apiKey, source, empty, menu, select } = props;
    const [anchor, setAnchor] = useState({ el: null });
    const [selected, setSelected] = useState([]);

    const handleClick = (e, photoId, url) => {
        setAnchor({ el: e.currentTarget, photoId, url });
    };

    const handleClose = () => {
        setAnchor({ el: null });
    };

    const onSelect = (id) => {
        const newSelected = (selected.includes(id)) ?
            selected.filter(item => item !== id)
            : [...selected, id];
        setSelected(newSelected);
    };

    const { data } = useApiData(apiKey, source, true);
    const photos = data || [1, 2, 3].map(id => ({ id, isLoading: true }));

    const classes = useStyles();
    const isLarge = useMediaQuery(theme => theme.breakpoints.up('md'));
    const isMedium = useMediaQuery(theme => theme.breakpoints.up('sm'));
    const cols = isLarge ? 4 : isMedium ? 3 : 2;
    const cellHeight = (isLarge || isMedium) ? 180 : 100;
    return <div className={classes.container}>
        <pre style={{ width: '100%' }}>{JSON.stringify(selected, null, 2)}</pre>
        <GridList cellHeight={cellHeight} cols={cols} className={classes.gridList}>
            {photos.map(photo => {
                return <GridListTile key={photo.id} className={classes.tile}>
                    <Photo
                        photo={photo}
                        isSmall={(!isLarge && !isMedium)}
                        {...props}
                        onClickMenu={menu && handleClick}
                        onSelect={select && onSelect}
                        isSelected={selected.includes(photo.id)}
                    />
                </GridListTile>
            })}
        </GridList>
        {menu && <PhotoMenu anchor={anchor} handleClick={handleClick} handleClose={handleClose} />}
        {empty && (photos.length === 0) && <Empty message={empty} />}
    </div>
}

export default PhotoList;