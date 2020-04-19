import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../theme';

const useStyles = makeStyles({
    container: {
        paddingBottom: theme.spacing(4),
    },
    card: {
        position: 'relative',
        background: 'none'
    },
    media: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%',
        zIndex: -1,
    },
    edit: {
        backgroundColor: 'rgba(0,0,0,.2)',
        marginLeft: theme.spacing(1),
    },
    imageEdit: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
        backgroundColor: 'rgba(0,0,0,.2)',
        marginLeft: theme.spacing(1),
    },
    text: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: theme.spacing(.5, 1),
        borderRadius: theme.spacing(.5),
    },
    actions: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1, 1, 1, 3),
        justifyContent: 'space-between',
    }
});



const GroupHeader = () => {
    const classes = useStyles();
    return <div className={classes.container}>
        <Card className={classes.card}>
            <CardContent className={classes.content}>
                <Typography gutterBottom variant="h3" component="h2">
                    <span className={classes.text}>Foto's van Blob</span>
                    <IconButton size='small' color='inherit' className={classes.edit}>
                        <Icon fontSize='small'>edit</Icon>
                    </IconButton>
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" color="textSecondary" component="p">
                        <span className={classes.text}>Laag naar de top sinds 1985</span>
                        <IconButton size='small' color='inherit' className={classes.edit}>
                            <Icon fontSize='small'>edit</Icon>
                        </IconButton>
                    </Typography>
                    <Typography variant="caption" color="textSecondary" component="p"
                        className={classes.text}>
                        since 8 Jan 2019<br />
                        6 albums<br />
                        492 photos<br />
                        19 members
                    </Typography>
                </div>
            </CardContent>
            <CardActions className={classes.actions}>
                <AvatarGroup max={3}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </AvatarGroup>
                <Button color="inherit"
                    endIcon={<Icon >expand_more</Icon>}
                >
                    view members
                </Button>
            </CardActions>
            <CardMedia className={classes.media}
                image="/cover 2.jpg"
                title="Contemplative Reptile"
            />
            <IconButton size='small' color='inherit' className={classes.imageEdit}>
                <Icon fontSize='small'>edit</Icon>
            </IconButton>
        </Card>
    </div>
}

export default GroupHeader;