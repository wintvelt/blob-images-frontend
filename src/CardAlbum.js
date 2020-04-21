import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { CardActionArea } from '@material-ui/core';

import Link from './UnstyledLink';

const useStyles = makeStyles(theme => ({
    card: {
        position: 'relative',
        backgroundColor: 'white',
        height: '200px',
    },
    cardNew: {
        position: 'relative',
        background: 'none',
        height: '200px',
    },
    actionArea: {
        height: 'inherit'
    },
    content: {
        position: 'relative',
    },
    newContent: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed rgba(255,255,255,.8)',
    },
    media: {
        height: theme.spacing(12)
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
}));

const AlbumCardContent = (props) => {
    const { title, description, stats, image, isNew } = props;
    const classes = useStyles();

    return <>
        {image && <CardMedia className={classes.media}
            image={image.src}
            title={image.title}
        />}
        <CardContent className={(isNew) ? classes.newContent : classes.content}>
            {title && <Typography gutterBottom variant='h6' component='h5'>
                <span className={classes.text}>{title}</span>
            </Typography>}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {description && <Typography variant="subtitle1" color="textSecondary" component="p">
                    <span className={classes.text}>{description}</span>
                </Typography>}
                {stats && <Typography variant="caption" color="textSecondary" component="p"
                    className={classes.text}>
                    {stats.map((stat) => (
                        <React.Fragment key={stat}>{stat}<br /></React.Fragment>
                    ))}
                </Typography>}
            </div>
            {isNew && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Icon fontSize='large' color='secondary'>add</Icon>
                <Typography>New Album</Typography>
            </div>}
        </CardContent>
    </>
}

const CardAlbum = (props) => {
    const { groupId, id, isHeader, userIsAdmin, isNew } = props;
    const classes = useStyles();
    const href = `/personal/groups/${groupId}/albums/${id || 'new'}`;
    return <Card className={isNew ? classes.cardNew : classes.card}>
        {(isHeader) ?
            <AlbumCardContent {...props} />
            : <CardActionArea className={classes.actionArea}>
                <Link href={(isNew) ? href + '/edit' : href}>
                    <AlbumCardContent {...props} />
                </Link>
            </CardActionArea>
        }
        {userIsAdmin && <Link href={href + '/edit'}>
            <IconButton size='small' color='inherit' className={classes.imageEdit}>
                <Icon fontSize='small'>{(isHeader) ? 'edit' : 'more_vert'}</Icon>
            </IconButton>
        </Link>}
    </Card>
}

export default CardAlbum;