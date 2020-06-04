import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

import { makeImageUrl } from './imageProvider';
import ImageUpload from './FormField-Image-Upload';
import PhotoPicker from './FormField-Image-Photos';
import { useApiData } from './DataProvider';


const useStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(2, 0),
        alignItems: 'stretch',
    },
    itemImage: {
        padding: theme.spacing(1),
        border: '1px solid rgba(0,0,0,.23)',
        borderRadius: '4px',
        height: theme.spacing(20),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    item: {
        padding: theme.spacing(0, 1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    image: {
        objectFit: 'scale-down',
        maxHeight: '100%',
        maxWidth: '100%',
    },
    avatar: {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '50px',
    },
    imageLabel: {
        fontSize: '12px',
        color: 'rgba(0,0,0,.5)',
        position: 'absolute',
        top: '-9px',
        left: '8px',
        backgroundColor: 'white',
        padding: '0 4px',
    }
}));

const setValue = (value) => ({ target: { value } });

const ImageField = (props) => {
    const { field, onChange } = props;
    const { value, isGroup, isAlbum, isAvatar, label } = field;
    const { image, owner, album } = value || {};
    const { name } = owner || {};
    const classes = useStyles();
    const myPhotos = useApiData('myPhotos', '/photos');
    const hasMyPhotos = (myPhotos.data && myPhotos.data.length > 0);
    const router = useRouter();
    const groupId = router.query.id;
    const albumId = router.query.albumid;
    const groupPhotos = useApiData(`groupPhotos`, `/groups/${groupId}/photos`);
    const hasGroupPhotos = (groupPhotos.data && groupPhotos.data.length > 0);
    const albumPhotos = useApiData(`albumPhotos`, `/groups/${groupId}/albums/${albumId}/photos`);
    const hasAlbumPhotos = (albumPhotos.data && albumPhotos.data.length > 0);
    const width = isAvatar ? 100 : 540;
    const height = isAvatar ? 100 : 144;
    const imgClass = isAvatar ? classes.avatar : classes.image;
    const imageUrl = makeImageUrl(image, width, height);
    const [imageMenu, setImageMenu] = useState({});
    const menuAnchor = useRef();

    const handleChange = (newValue) => {
        onChange(setValue(newValue));
        setImageMenu({ anchor: imageMenu.anchor });
    };

    const handleClickMenu = (action) => (e) => {
        switch (action) {
            case 'open':
                setImageMenu({ isOpen: true, anchor: e.target })
                break;

            case 'upload':
                setImageMenu({ anchor: imageMenu.anchor, upLoadOpen: true })
                break;

            case 'myPhotos':
                setImageMenu({ anchor: imageMenu.anchor, pickType: 'myPhotos' })
                break;

            case 'group':
                setImageMenu({ anchor: imageMenu.anchor, pickType: 'group' })
                break;

            case 'album':
                setImageMenu({ anchor: imageMenu.anchor, pickType: 'album' })
                break;

            case 'clear':
                handleChange('');

            case 'close':
                setImageMenu({ anchor: imageMenu.anchor });
                break;

            default:
                break;
        }
    };

    return <Grid container className={classes.container}>
        <Grid item xs={6} className={classes.itemImage}>
            <legend className={classes.imageLabel}>{label}</legend>
            {imageUrl &&
                <img src={imageUrl} alt='group image thumbnail' className={imgClass} />
            }
            {!imageUrl &&
                <Icon color='disabled' style={{ fontSize: '40px' }}>image</Icon>
            }
        </Grid>
        <Grid item xs={6} className={classes.item}>
            <div>
                {(owner) && <>
                    <Typography variant='caption'>Photo by:</Typography>
                    <Typography variant='body1' gutterBottom>{name}</Typography>
                </>}
                {(isGroup || isAlbum) && album && <>
                    <Typography variant='caption'>From album:</Typography>
                    <Typography variant='body1'>{album}</Typography>
                </>}
            </div>
            <Button size='small' variant='contained' color='primary' ref={menuAnchor}
                aria-controls="image-pick-menu" aria-haspopup="true" onClick={handleClickMenu('open')}
                endIcon={<Icon>expand_more</Icon>}>
                {(image) ? 'Change photo' : 'add photo'}
            </Button>
            <Menu
                id="image-pick-menu"
                anchorEl={menuAnchor.current}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                open={!!(imageMenu.isOpen)}
                onClose={handleClickMenu('close')}
            >
                {isGroup &&
                    <MenuItem onClick={handleClickMenu('group')} disabled={!hasGroupPhotos}>
                        Pick from group photos
                    </MenuItem>
                }
                {isAlbum &&
                    <MenuItem onClick={handleClickMenu('album')} disabled={!hasAlbumPhotos}>
                        Pick from album photos
                    </MenuItem>
                }
                <MenuItem onClick={handleClickMenu('myPhotos')} disabled={!hasMyPhotos}>
                    Pick from my photos
                </MenuItem>
                <MenuItem onClick={handleClickMenu('upload')}>Upload new photo</MenuItem>
                <MenuItem onClick={handleClickMenu('clear')} disabled={!imageUrl}>
                    Remove photo
                </MenuItem>
            </Menu>
        </Grid>
        <ImageUpload open={!!imageMenu.upLoadOpen} handleClose={handleClickMenu('close')}
            onChange={handleChange} />
        <PhotoPicker type={imageMenu.pickType} open={!!imageMenu.pickType} handleClose={handleClickMenu('close')}
            onChange={handleChange} />
    </Grid>
}

export default ImageField;