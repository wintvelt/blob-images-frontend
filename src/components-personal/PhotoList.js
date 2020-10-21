import React, { useState, useEffect } from 'react';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Photo from './PhotoCard';
import PhotoMenu from './PhotoListMenu';

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

const fullHeight = { height: '100%' };
const fullWidth = { width: '100%' };

const Empty = ({ message }) => {
    return <div style={fullHeight}>
        <Typography color='textSecondary'>{message}</Typography>
    </div>
}

const initialPhotos = [1, 2, 3, 4, 5, 6];

const PhotoList = (props) => {
    const { photoData, empty, select, album, userIsAdmin, onClick, noMenu,
        reloadAlbum, reloadGroup, deletePhoto } = props;
    const [photos, setPhotos] = useState(initialPhotos);
    const newPics = album?.newPics || [];
    useEffect(() => {
        let isMounted = true;
        if (photoData.contents && isMounted) {
            setPhotos(photoData.contents);
        }
        return () => { isMounted = false };
    }, [photoData]);
    const [anchor, setAnchor] = useState({ el: null });
    const [selected, setSelected] = useState([]);

    const handleMenuClick = (e, photo) => {
        setAnchor({ el: e.currentTarget, photo });
    };

    const handleMenuClose = () => {
        setAnchor({ el: null });
    };

    const onSelect = (id) => {
        console.log(`clicked select with id "${id}"`);
        const newSelected = (selected.includes(id)) ?
            selected.filter(item => item !== id)
            : [...selected, id];
        setSelected(newSelected);
    };

    const classes = useStyles();
    const isLarge = useMediaQuery(theme => theme.breakpoints.up('lg'));
    const isMedium = useMediaQuery(theme => theme.breakpoints.up('sm'));
    const cols = isLarge ? 6 : isMedium ? 4 : 1;
    const cellHeight = (isLarge || isMedium) ? 180 : 300;
    return <div className={classes.container}>
        {/* <pre style={fullWidth}>{JSON.stringify(selected, null, 2)}</pre>
        <pre style={fullWidth}>{JSON.stringify(photos, null, 2)}</pre> */}
        <GridList cellHeight={cellHeight} cols={cols} className={classes.gridList}>
            {photos.map(photoId => {
                return <GridListTile key={photoId} className={classes.tile}>
                    <Photo
                        photoId={(typeof photoId === 'string') ? photoId : ''}
                        isSmall={(!isLarge && !isMedium)}
                        {...props}
                        onClickMenu={!noMenu && handleMenuClick}
                        onSelect={select && onSelect}
                        isSelected={selected.includes(photoId)}
                        menuIsOpen={!!anchor.el}
                        isNew={newPics.includes(photoId)}
                    />
                </GridListTile>
            })}
        </GridList>
        <PhotoMenu
            anchor={anchor}
            handleClose={handleMenuClose}
            album={album}
            userIsAdmin={userIsAdmin}
            reloadAlbum={reloadAlbum}
            deletePhoto={deletePhoto}
            reloadGroup={reloadGroup}
        />
        {empty && (photos.length === 0) && <Empty message={empty} />}
    </div>
};

export default PhotoList;