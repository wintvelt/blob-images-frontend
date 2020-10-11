import React from 'react';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import { ClubImage } from '../components-generic/imageProvider';
import { useRecoilValueLoadable } from 'recoil';
import { photoState } from '../data/activeTree-Photo';
import Rating from '../components-generic/Rating';

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
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    new: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '50%',
        transform: 'none!important'
    }
}));

const flexStyle = { display: 'flex' };
const flexStyle2 = {
    display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)'
};
const bigIcon = { fontSize: '40px' };
const fullSize = { width: '100%', height: '100%' };
const fitContent = {
    height: 'fit-content',
    paddingBottom: '8px',
    background: 'linear-gradient(0deg, rgba(0,0,0,.8) 0%, rgba(0,0,0,0) 100%)'
};

const SelectButton = ({ iconClass, icon, onSelect, disabled }) => (
    <div style={flexStyle}>
        <IconButton aria-label={`select photo`} className={iconClass}
            onClick={onSelect} disabled={disabled}>
            <Icon fontSize='small'>{icon}</Icon>
        </IconButton>
    </div>
)
const MenuButton = ({ className, onClick, disabled }) => (
    <IconButton className={className} onClick={onClick} disabled={disabled}>
        <Icon>more_vert</Icon>
    </IconButton>
)

const Photo = ({ photoId, isSmall, isNew, onSelect, isSelected, onClick, onClickMenu, noOwner,
    menuIsOpen }) => {
    const classes = useStyles();
    const source = `/photos/${photoId}`;
    const photoData = useRecoilValueLoadable(photoState(source));
    const photo = (photoData.state === 'hasValue' && photoData.contents) ? photoData.contents : {};
    const { url, user, rating, createdAt } = photo;
    const { name, photoUrl } = user || {};
    const isLoading = (!url);

    const icon = (isSelected) ? 'check_box_outline' : 'check_box_outline_blank';
    const handleClick = (e) => {
        e.preventDefault();
        if (!isLoading) {
            onClick && onClick({ photoId, url });
        }
    }
    const handleMenuClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return onClickMenu(e, photo);
    }
    const handleSelect = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onSelect && onSelect(photoId);
    }
    return <div onClick={handleClick} style={fullSize}>
        {(isLoading) && <div style={flexStyle2}>
            <Icon className={'pulse-icon'} style={bigIcon}>image</Icon>
        </div>}
        {(url) && <ClubImage src={url} alt='photo' className={classes.img} />}
        <GridListTileBar
            style={fitContent}
            title={(name && !noOwner) ? `by ${name}` : ''}
            subtitle={<>
                {createdAt}<br />
                <Rating value={rating} />
            </>}
            actionIcon={(onSelect) && <SelectButton iconClass={classes.icon}
                icon={icon} onSelect={handleSelect} disabled={menuIsOpen} />}
        />
        {isNew && <img src='/img/new.png' className={classes.new} />}
        {(onClickMenu) && <MenuButton className={classes.menuIcon}
            onClick={handleMenuClick} disabled={menuIsOpen} />}
    </div>
}

export default Photo;