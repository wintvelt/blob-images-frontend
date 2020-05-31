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

import Link from '../components-generic/UnstyledLink';

import { TextSkeleton } from '../../src/components-generic/Skeleton';
import { makeImageUrl } from '../components-generic/imageProvider';

const useStyles = makeStyles(theme => ({
    card: {
        position: 'relative',
        // backgroundColor: theme.palette.background.paper,
        background: 'linear-gradient(308deg, rgba(88,163,69,1) 14%, rgba(151,164,71,1) 43%, rgba(100,105,167,1) 77%)',
        color: 'white',
        height: '200px',
    },
    actionArea: {
        height: 'inherit'
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
}));

const AlbumCardContent = (props) => {
    const { name, image, stats, isLoading } = props;
    const imageUrl = makeImageUrl(image && image.image, 340, 200);
    const classes = useStyles();
    return <CardContent className={classes.content}>
        <Typography gutterBottom variant='h6' component='h5'>
            <TextSkeleton className={classes.text} isLoading={isLoading}>{name}</TextSkeleton>
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {stats && <Typography variant="caption" color="textSecondary" component="p"
                className={classes.text}>
                {stats.map((stat) => (
                    <React.Fragment key={stat}>{stat}<br /></React.Fragment>
                ))}
            </Typography>}
        </div>
    </CardContent>
}

const AlbumCardLayout = (props) => {
    const { groupId, albumId, userIsAdmin, image, withEdit } = props;
    const mayEdit = (userIsAdmin && withEdit);
    const classes = useStyles();
    const router = useRouter();

    const detailUrl = `/personal/groups/[id]/albums/[albumId]`;

    const onClick = (e) => {
        e.preventDefault();
        router.push(detailUrl, detailUrl.replace('[id]', groupId).replace('[albumId]', albumId));
    }

    const onClickEdit = (e) => {
        e.preventDefault();
        const editUrl = detailUrl + '/edit';
        router.push(editUrl, editUrl.replace('[id]', groupId).replace('[albumId]', albumId));
    }

    return <Card className={classes.card}>
        {(withEdit) ?
            <CardActionArea className={classes.actionArea}>
                <Link href={'/'}>
                    <AlbumCardContent {...props} />
                </Link>
            </CardActionArea>
            : <AlbumCardContent {...props} />
        }
        {mayEdit && <Link href={href + '/edit'}>
            <IconButton size='small' color='inherit' className={classes.imageEdit}>
                <Icon fontSize='small'>edit</Icon>
            </IconButton>
        </Link>}
    </Card>
}

export default AlbumCardLayout;