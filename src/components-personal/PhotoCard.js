import React from 'react';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import { makeImageUrl, otoa } from '../components-generic/imageProvider';
import { TextSkeleton, ImageSkeleton } from '../components-generic/Skeleton';
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
        willChange: 'transform',
        transition: 'transform .5s ease',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    }
}));

const flexStyle = { display: 'flex' };
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

const Photo = ({ photo: photoParams, isSmall, onSelect, isSelected, onClick, onClickMenu, noOwner,
    menuIsOpen }) => {
    const classes = useStyles();
    const Key = { PK: photoParams.PK, SK: photoParams.SK };
    const source = photoParams.PK && `/photos/${otoa(Key)}`;
    const photoData = useRecoilValueLoadable(photoState(source));
    const photo = (photoData.state === 'hasValue' && photoData.contents) ? photoData.contents : {};
    const { url, owner, album, createdAt, PK } = photo;
    const id = PK?.slice(2);
    const { name, avatar } = owner || {};
    const isLoading = (!url);
    const imageUrl = makeImageUrl(url, 400);

    const icon = (isSelected) ? 'check_box_outline' : 'check_box_outline_blank';
    const handleClick = (e) => {
        e.preventDefault();
        if (!isLoading) {
            onClick && onClick({ id, url, image: url, owner });
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
        onSelect && onSelect(id);
    }
    return <div onClick={handleClick} style={fullSize}>
        <ImageSkeleton src={imageUrl} alt='photo' className={classes.img} isLoading={isLoading} />
        <GridListTileBar
            style={fitContent}
            title={(name)? `by ${name}` : ''}
            subtitle={<>
                {createdAt}<br />
                <Rating value={123}/>
            </>}
            // title={(!noOwner && (name || isLoading)) &&
            //     <TextSkeleton isLoading={isLoading}>{(!isSmall) && 'by '}{name}</TextSkeleton>}
            // subtitle={(!isSmall || noOwner) && <>
            //     {(album) &&
            //         <TextSkeleton isLoading={isLoading}>
            //             {album && album.name}
            //             <br />
            //         </TextSkeleton>}
            //     {(date || isLoading) &&
            //         <TextSkeleton isLoading={isLoading}>{(!isSmall) && 'added '}{date}</TextSkeleton>}
            // </>}
            actionIcon={(onSelect) && <SelectButton iconClass={classes.icon}
                icon={icon} onSelect={handleSelect} disabled={menuIsOpen} />}
        />
        {(onClickMenu) && <MenuButton className={classes.menuIcon}
            onClick={handleMenuClick} disabled={menuIsOpen} />}
    </div>
}

export default Photo;