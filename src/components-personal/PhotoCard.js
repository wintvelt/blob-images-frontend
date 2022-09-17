import React from 'react';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import { ClubImage } from '../components-generic/imageProvider';
import { usePhoto } from '../data/activeTree-Photo';
import Rating from '../components-generic/Rating';
import { useUserValue } from '../data/userData';

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
        width: '30%',
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

const Photo = ({ photoId, photo: photoRec, isSmall, isNew, onSelect, isSelected, onClick, onClickMenu, noOwner,
    userIsAdmin, menuIsOpen }) => {
    const classes = useStyles();
    const userData = useUserValue();
    const currentUser = userData.profile;
    const photoData = usePhoto(photoId);
    const photo = photoRec || photoData.contents || {};
    const sortDate = photo.sortDate || photo.createdAt;
    const { url, user, rating } = photo;
    const { name, photoUrl } = user || {};
    const isLoading = (!url);
    const userIsOwner = (user && user.SK === currentUser?.id);

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
    };
    const hasMenu = onClickMenu && (userIsAdmin || userIsOwner);
    const handleSelect = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onSelect && onSelect(photoId);
    }
    return <div onClick={handleClick} style={fullSize}>
        {(isLoading) && <div style={flexStyle2}>
            <Icon className={'pulse-icon'} style={bigIcon}>image</Icon>
        </div>}
        {(url) && <ClubImage src={url} alt='photo' className={classes.img} width={400} />}
        <ImageListItemBar
            style={fitContent}
            title={(name && !noOwner) ? `by ${name}` : ''}
            subtitle={<>
                {sortDate} - {photo.createdAt}<br />
                <Rating value={rating} />
            </>}
            actionIcon={(onSelect) && <SelectButton iconClass={classes.icon}
                icon={icon} onSelect={handleSelect} disabled={menuIsOpen} />}
        />
        {isNew && <img src='/img/new.png' className={classes.new} />}
        {(hasMenu) && <MenuButton className={classes.menuIcon}
            onClick={handleMenuClick} disabled={menuIsOpen} />}
    </div>
}

export default Photo;