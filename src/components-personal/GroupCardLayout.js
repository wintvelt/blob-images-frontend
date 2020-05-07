import React from 'react';
import { useRouter } from 'next/router';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import { TextSkeleton } from '../../src/components-generic/Skeleton';

const useStyles = makeStyles(theme => ({
    card: {
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        color: 'white',
        height: '200px',
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
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: theme.spacing(0, .4),
        borderRadius: theme.spacing(.5),
    },
}));

const GroupCardContent = (props) => {
    const { title, subtitle, image, isLoading } = props;
    const classes = useStyles();
    return <>
        {image && <CardMedia className={classes.media}
            image={image}
            title={`${title} group`}
        />}
        <CardContent className={classes.content}>
            <Typography gutterBottom variant='h4' component='h5' align='center'>
                <TextSkeleton className={classes.text} isLoading={isLoading}>{title}</TextSkeleton>
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1" component="p" align='center'>
                    <TextSkeleton className={classes.text} isLoading={isLoading}>{subtitle}</TextSkeleton>
                </Typography>
            </div>
        </CardContent>
    </>
}

const GroupCardLayout = (props) => {
    const { id, userIsAdmin, image, withEdit } = props;
    const mayEdit = (userIsAdmin && withEdit);
    const classes = useStyles();
    const router = useRouter();

    const detailUrl = `/personal/groups/[id]`;

    const onClick = (e) => {
        e.preventDefault();
        router.push(detailUrl, detailUrl.replace('[id]', id));
    }

    return <Card className={classes.card}>
        {(withEdit) ?
            <CardActionArea style={{ height: '100%' }} onClick={onClick}>
                <GroupCardContent {...props} />
            </CardActionArea>
            : <GroupCardContent {...props} onClick={onClick} />
        }
        {image && mayEdit && <IconButton size='small' className={classes.imageEdit}
            onClick={onClick}>
            <Icon fontSize='small'>edit</Icon>
        </IconButton>}

    </Card>
}

export default GroupCardLayout;