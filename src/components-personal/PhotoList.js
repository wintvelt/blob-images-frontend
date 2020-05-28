import React, { useState } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { makeImageUrl } from '../components-generic/imageProvider';
import { TextSkeleton, ImageSkeleton } from '../components-generic/Skeleton';
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
    icon: {
        color: 'white',
        width: theme.spacing(4),
        height: theme.spacing(4),
        padding: 0,
    },
    img: {
        transition: 'transform .5s ease',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    }
}));

const Photo = ({ photo, isSmall, onClick, noOwner }) => {
    const classes = useStyles();
    const [isSelected, setIsSelected] = useState(false);
    const icon = (isSelected) ? 'check_box_outline' : 'check_box_outline_blank';
    const { image, owner, album, date, id } = photo;
    const { name } = owner || {};
    const isLoading = (!image);
    const imageUrl = makeImageUrl(image);
    const handleClick = () => {
        if (!isLoading) {
            setIsSelected(true);
            onClick({ image, owner });
        }
    }
    return <div onClick={handleClick} style={{ width: '100%', height: '100%' }}>
        <ImageSkeleton src={imageUrl} alt='photo' className={classes.img} isLoading={isLoading} />
        <GridListTileBar
            style={{ height: 'fit-content' }}
            title={((name && !noOwner) || isLoading) &&
                <TextSkeleton isLoading={isLoading}>{(!isSmall) && 'by: '}{name}</TextSkeleton>}
            subtitle={(!isSmall || noOwner) && <>
                {(album || isLoading) &&
                    <TextSkeleton isLoading={isLoading}>{(!isSmall) && 'album: '}{album}</TextSkeleton>}
                {(date || isLoading) &&
                    <TextSkeleton isLoading={isLoading}>{(!isSmall) && 'added: '}{date}</TextSkeleton>}
            </>}
            actionIcon={
                <div style={{ display: 'flex' }}>
                    <IconButton aria-label={`select photo`}
                        className={classes.icon}>
                        <Icon fontSize='small'>{icon}</Icon>
                    </IconButton>
                </div>
            }
        />
    </div>
}

const Empty = ({ message }) => {
    return <div style={{ height: '100%' }}>
        <Typography color='textSecondary'>{message}</Typography>
    </div>
}

const PhotoList = ({ apiKey, source, onClick, noOwner, empty }) => {
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
                    <Photo photo={photo} isSmall={(!isLarge && !isMedium)} onClick={onClick} noOwner={noOwner} />
                </GridListTile>
            })}
        </GridList>
        {empty && (photos.length === 0) && <Empty message={empty} />}
    </div>
}

export default PhotoList;