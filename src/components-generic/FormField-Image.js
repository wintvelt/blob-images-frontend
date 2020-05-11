import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { useImage } from './imageProvider';


const useStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(2, 0),
        alignItems: 'stretch',
    },
    itemImage: {
        padding: theme.spacing(2),
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

const ImageField = (props) => {
    const { field } = props;
    const { value } = field;
    const classes = useStyles();
    const imageUrl = useImage(value);
    const [menuAnchor, setMenuAnchor] = useState(null);

    const handleMenuClick = (e) => {
        setMenuAnchor(e.currentTarget);
    }
    const handleClose = () => {
        setMenuAnchor(null);
    }

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
            <Button size='small' variant='contained' color='primary'
                aria-controls="image-pick-menu" aria-haspopup="true" onClick={handleMenuClick}
                endIcon={<Icon>expand_more</Icon>}>
                Change photo
            </Button>
            <Menu
                id="image-pick-menu"
                anchorEl={menuAnchor}
                keepMounted
                open={Boolean(menuAnchor)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Pick from group photos</MenuItem>
                <MenuItem onClick={handleClose}>Pick from my photos</MenuItem>
                <MenuItem onClick={handleClose}>Upload new photo</MenuItem>
                <MenuItem onClick={handleClose}>Remove photo</MenuItem>
            </Menu>
        </Grid>
    </Grid>
}

export default ImageField;