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
import { makeImageUrl } from '../components-generic/imageProvider';

const useStyles = makeStyles(theme => ({
    card: {
        position: 'relative',
        // backgroundColor: theme.palette.background.paper,
        height: '200px',
    },
    image: {
        background: 'linear-gradient(308deg, rgba(70,52,78,1) 14%, rgba(90,85,96,1) 43%, rgba(157,141,143,1) 77%)',
        height: '120px',
        backgroundSize: 'cover',
    },
    actionArea: {
        height: 'inherit'
    },
    content: {
        color: theme.palette.text.secondary,
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

const AlbumCardContent = (props) => {
    const { name, image, stats, isLoading } = props;
    const imageUrl = makeImageUrl(image && image.image, 340, 200);
    const classes = useStyles();
    return <>
        {(image) ?
            <CardMedia className={classes.image}
                image={imageUrl}
            />
            : <div className={classes.image} />
        }
        <CardContent className={classes.content}>
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
    </>
}

const AlbumCardLayout = (props) => {
    const { groupId, id, userIsAdmin, withEdit } = props;
    const mayEdit = (userIsAdmin && withEdit);
    const classes = useStyles();
    const router = useRouter();

    const detailUrl = `/personal/groups/[id]/albums/[albumid]`;

    const onClick = (e) => {
        e.preventDefault();
        router.push(detailUrl, detailUrl.replace('[id]', groupId).replace('[albumid]', id));
    }

    const onClickEdit = (e) => {
        e.preventDefault();
        const editUrl = detailUrl + '/edit';
        router.push(editUrl, editUrl.replace('[id]', groupId).replace('[albumid]', id));
    }

    return <Card className={classes.card}>
        {(withEdit) ?
            <CardActionArea onClick={onClick}>
                <AlbumCardContent {...props} />
            </CardActionArea>
            : <AlbumCardContent {...props} />
        }
        {mayEdit && <IconButton size='small' color='inherit' className={classes.imageEdit}
            onClick={onClickEdit}>
            <Icon fontSize='small'>edit</Icon>
        </IconButton>}
    </Card>
}

export default AlbumCardLayout;