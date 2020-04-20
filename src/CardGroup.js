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

const useStyles = makeStyles(theme => ({
    card: {
        position: 'relative',
        backgroundColor: 'white'
    },
    groupCard: {
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
    },
    content: {
        position: 'relative',
    },
    groupMedia: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%',
        zIndex: 0,
    },
    media: {
        height: theme.spacing(12)
    },
    edit: {
        backgroundColor: 'rgba(0,0,0,.2)',
        marginLeft: theme.spacing(1),
        position: 'relative',
    },
    imageEdit: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
        zIndex: 99,
        backgroundColor: 'rgba(0,0,0,.2)',
        marginLeft: theme.spacing(1),
    },
    text: {
        color: 'rgba(0,0,0,.8)',
    },
    groupText: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: theme.spacing(.4),
        borderRadius: theme.spacing(.5),
    },
    actions: {
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1, 1, 1, 3),
        justifyContent: 'space-between',
    }
}));

const CardGroup = (props) => {
    const { title, description, stats, image,
        members, userIsAdmin, isGroup } = props;
    const mayEdit = isGroup && userIsAdmin;
    const classes = useStyles();
    const textClass = (isGroup) ? classes.groupText : classes.text;
    const cardClass = (isGroup) ? classes.groupCard : classes.card;
    return <Card className={cardClass}>
        {image && <CardMedia className={(isGroup) ? classes.groupMedia : classes.media}
            image={image.src}
            title={image.title}
        />}
        {image && mayEdit && <IconButton size='small' color='inherit' className={classes.imageEdit}
            onClick={() => alert('clicked')}>
            <Icon fontSize='small'>edit</Icon>
        </IconButton>}
        <CardContent className={classes.content}>
            <Typography gutterBottom variant={(isGroup) ? 'h3' : 'body2'} component='h5'>
                <span className={textClass}>{title}</span>
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {description && <Typography variant="subtitle1" color="textSecondary" component="p">
                    <span className={textClass}>{description}</span>
                </Typography>}
                {stats && <Typography variant="caption" color="textSecondary" component="p"
                    className={textClass}>
                    {stats.map((stat) => (
                        <React.Fragment key={stat}>{stat}<br /></React.Fragment>
                    ))}
                </Typography>}
            </div>
        </CardContent>
        {isGroup && members && <CardActions className={classes.actions}>
            <AvatarGroup max={5}>
                {members.map((member) => (
                    <Avatar key={member.name} alt={member.name} src={member.avatar || 'none'}/>
                ))}
            </AvatarGroup>
            <Button color="inherit"
                endIcon={<Icon >expand_more</Icon>}
            >
                view members
            </Button>
        </CardActions>}
    </Card>
}

export default CardGroup;