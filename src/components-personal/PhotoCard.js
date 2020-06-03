import React, { useState } from 'react';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import { makeImageUrl } from '../components-generic/imageProvider';
import { TextSkeleton, ImageSkeleton } from '../components-generic/Skeleton';

const useStyles = makeStyles(theme => ({
    icon: {
        color: 'white',
        width: theme.spacing(4),
        height: theme.spacing(4),
        padding: 0,
    },
    menuIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
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

const SelectButton = ({ iconClass, icon, onSelect }) => (
    <div style={{ display: 'flex' }}>
        <IconButton aria-label={`select photo`} className={iconClass} onClick={onSelect}>
            <Icon fontSize='small'>{icon}</Icon>
        </IconButton>
    </div>
)
const MenuButton = ({ className, onClick }) => (
    <IconButton className={className} onClick={onClick}>
        <Icon>more_vert</Icon>
    </IconButton>
)

const Photo = ({ photo, isSmall, onSelect, isSelected, onClick, onClickMenu, noOwner }) => {
    const classes = useStyles();
    const icon = (isSelected) ? 'check_box_outline' : 'check_box_outline_blank';
    const { image, owner, album, date, id } = photo;
    const { name } = owner || {};
    const isLoading = (!image);
    const imageUrl = makeImageUrl(image);
    const handleClick = () => {
        if (!isLoading) {
            onClick({ id, image, owner });
        }
    }
    const handleMenuClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return onClickMenu(e, id, image);
    }
    const handleSelect = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onSelect && onSelect(id);
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
            actionIcon={(onSelect) && <SelectButton iconClass={classes.icon} icon={icon} onSelect={handleSelect}/>}
        />
        {(onClickMenu) && <MenuButton className={classes.menuIcon} onClick={handleMenuClick} />}
    </div>
}

export default Photo;