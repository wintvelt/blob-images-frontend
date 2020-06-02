import React from 'react';
import { useRouter } from 'next/router';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { TextSkeleton } from '../../src/components-generic/Skeleton';
import { makeImageUrl } from '../../src/components-generic/imageProvider';

import Link from '../components-generic/Link';
import BackLink from '../components-generic/BackLink';

const useStyles = makeStyles(theme => ({
    card: {
        position: 'relative',
        // backgroundColor: theme.palette.background.paper,
        background: 'linear-gradient(308deg, rgba(88,163,69,1) 14%, rgba(151,164,71,1) 43%, rgba(100,105,167,1) 77%)',
        backgroundSize: 'cover',
        width: '100%',
        height: '384px',
        marginBottom: theme.spacing(1),
    },
    content: {
        position: 'relative',
        color: 'white',
        padding: theme.spacing(8, 3, 3, 3),
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    groupMedia: {
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
        bottom: theme.spacing(3),
        right: theme.spacing(3),
        zIndex: 99,
        backgroundColor: 'rgba(0,0,0,.2)',
        color: 'white',
        marginLeft: theme.spacing(1),
    },
    groupText: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: theme.spacing(0, .4),
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

const AlbumImage = (props) => {
    const router = useRouter();
    const href = router.pathname + '/edit';
    const asPath = router.asPath + '/edit';
    const { imageClass, buttonClass, album } = props;
    const { data } = album;
    const { image, userIsAdmin } = data || {};
    const imgUrl = image && image.image;
    const imgOwner = image && image.owner;
    const imageUrl = makeImageUrl(imgUrl, 1440, 384);

    return <>
        {imageUrl && <CardMedia className={imageClass}
            image={imageUrl}
            title='Album cover image'
        />}
        {userIsAdmin && <Link href={href} as={asPath}>
            <IconButton size='small' className={buttonClass}>
                <Icon fontSize='small'>edit</Icon>
            </IconButton>
        </Link>}
    </>
}

const AlbumContent = (props) => {
    const { contentClass, textClass, album } = props;
    const { data, isLoading } = album;
    const { name, stats, group } = data || {};
    return <CardContent className={contentClass}>
        {group && <BackLink group={group} className={textClass}/>}
        <Grid container>
            <Grid item md={11} xs={12}>
                <Typography gutterBottom variant='h2' color='inherit'>
                    <TextSkeleton className={textClass} isLoading={isLoading}>
                        {name}
                    </TextSkeleton>
                </Typography>
            </Grid>
            <Grid item md={1} xs={12}>
                {stats && <Typography variant="caption" color="inherit" component="p"
                    className={textClass}>
                    {stats.map((stat) => (
                        <React.Fragment key={stat}>{stat}<br /></React.Fragment>
                    ))}
                </Typography>}
            </Grid>
        </Grid>
    </CardContent>
}

const AlbumHeaderLayout = ({ album }) => {
    const classes = useStyles();
    return <Card className={classes.card}>
        <AlbumImage imageClass={classes.groupMedia} buttonClass={classes.imageEdit} album={album} />
        <AlbumContent contentClass={classes.content} textClass={classes.groupText} album={album} />
    </Card>
}

export default AlbumHeaderLayout;