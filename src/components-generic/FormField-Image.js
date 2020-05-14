import React, { useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

import { makeImageUrl } from './imageProvider';
import ImageUpload from './FormField-Image-Upload';


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
}))

const setValue = (value) => ({ target: { value } });

const ImageField = (props) => {
    const { field, onChange } = props;
    const { value } = field;
    const classes = useStyles();
    const imageUrl = makeImageUrl(value, 540, 144);
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
            {imageUrl &&
                <img src={imageUrl} alt='group image thumbnail' className={classes.image} />
            }
            {!imageUrl &&
                <Icon color='disabled' style={{ fontSize: '40px' }}>image</Icon>
            }
        </Grid>
        <Grid item xs={6} className={classes.item}>
            <div>
                <Typography variant='caption'>Photo by:</Typography>
                <Typography variant='body1' gutterBottom>Michiel</Typography>
                <Typography variant='caption'>From album:</Typography>
                <Typography variant='body1'>Blob in Afrika</Typography>
            </div>
            <Button size='small' variant='contained' color='primary' ref={menuAnchor}
                aria-controls="image-pick-menu" aria-haspopup="true" onClick={handleClickMenu('open')}
                endIcon={<Icon>expand_more</Icon>}>
                Change photo
            </Button>
            <Menu
                id="image-pick-menu"
                anchorEl={imageMenu.anchor}
                keepMounted
                open={!!(imageMenu.isOpen)}
                onClose={handleClickMenu('close')}
            >
                <MenuItem onClick={handleClickMenu('close')}>Pick from group photos</MenuItem>
                <MenuItem onClick={handleClickMenu('close')}>Pick from my photos</MenuItem>
                <MenuItem onClick={handleClickMenu('upload')}>Upload new photo</MenuItem>
                <MenuItem onClick={handleClickMenu('clear')}>Remove photo</MenuItem>
            </Menu>
        </Grid>
        <ImageUpload open={!!imageMenu.upLoadOpen} handleClose={handleClickMenu('close')}
            onChange={handleChange} />
    </Grid>
}

export default ImageField;