import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';

import { TextSkeleton } from '../../src/components-generic/Skeleton';
import { makeImageUrl } from '../components-generic/imageProvider';
import { useSetLoadingPath } from '../data/loadingData';

const useStyles = makeStyles(theme => ({
    card: {
        position: 'relative',
        // backgroundColor: theme.palette.background.paper,
        background: 'linear-gradient(308deg, rgba(88,163,69,1) 14%, rgba(151,164,71,1) 43%, rgba(100,105,167,1) 77%)',
        color: 'white',
        height: '200px',
        width: '100%',
    },
    badge: {
        width: '100%',
    },
    content: {
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    media: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%',
        zIndex: 0,
    },
    imageEdit: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
        zIndex: 99,
        color: 'white   ',
        marginLeft: theme.spacing(1),
    },
}));

const GroupCardContent = (props) => {
    const { name, description, image, isLoading, isInvite } = props;
    const imageUrl = makeImageUrl(image && image.image, 340, 200);
    const classes = useStyles();
    return <>
        {(image || isInvite) && <CardMedia className={classes.media}
            image={imageUrl || '/img/confidential.jpg'}
            title={name ? `${name} group` : 'invite'}
        />}
        <CardContent className={classes.content}>
            <Typography gutterBottom variant='h4' component='h5' align='center'>
                <TextSkeleton className={classes.text} isLoading={isLoading}>{name}</TextSkeleton>
            </Typography>
            <Typography variant="body1" component="p" align='center'>
                <TextSkeleton className={classes.text} isLoading={isLoading}>{description}</TextSkeleton>
            </Typography>
        </CardContent>
    </>
};

const fullHeight = { height: '100%' };

const GroupCardLayout = (props) => {
    const { id, userIsAdmin, image, newPicsCount, withEdit } = props;
    const mayEdit = (userIsAdmin && withEdit);
    const classes = useStyles();
    const setLoadingPath = useSetLoadingPath();

    const detailUrl = `/personal/groups/[id]`;

    const onClick = (e) => {
        e.preventDefault();
        setLoadingPath(detailUrl, detailUrl.replace('[id]', id));
    }

    const onClickEdit = (e) => {
        e.preventDefault();
        const editUrl = detailUrl + '/edit';
        setLoadingPath(editUrl, editUrl.replace('[id]', id));
    }

    return <Badge badgeContent={newPicsCount} color='secondary' className={classes.badge}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
        <Card className={classes.card}>
            {(withEdit) ?
                <CardActionArea style={fullHeight} onClick={onClick}>
                    <GroupCardContent {...props} />
                </CardActionArea>
                : <GroupCardContent {...props} onClick={onClick} />
            }
            {image && mayEdit && <IconButton size='small' className={classes.imageEdit}
                onClick={onClickEdit}>
                <Icon fontSize='small'>edit</Icon>
            </IconButton>}

        </Card>
    </Badge>
}

export default GroupCardLayout;