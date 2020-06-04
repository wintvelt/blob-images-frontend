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
        color: 'white',
        backgroundColor: theme.palette.background.paper,
        backgroundSize: 'cover',
        width: '100%',
        // height: '384px',
        marginBottom: theme.spacing(1),
    },
    content: {
        position: 'relative',
        color: 'rgba(0,0,0,.8)',
        background: theme.palette.background.paper,
        padding: theme.spacing(3),
        // height: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    groupMedia: {
        height: '240px',
        // position: 'absolute',
        // top: 0,
        // height: '100%',
        // width: '100%',
        // zIndex: 0,
    },
    edit: {
        backgroundColor: 'rgba(0,0,0,.2)',
        marginLeft: theme.spacing(1),
        position: 'relative',
    },
    imageEdit: {
        backgroundColor: 'rgba(0,0,0,.2)',
        color: 'white',
        marginLeft: theme.spacing(1),
    },
    groupText: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        color: 'white',
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
    const { imageClass, buttonClass, album, textClass } = props;
    const { data } = album;
    const { image, userIsAdmin, group } = data || {};
    const imgUrl = image && image.image;
    const imgOwner = image && image.owner;
    const imageUrl = makeImageUrl(imgUrl, 1440, 384);

    const linkStyle = {
        position: 'absolute',
        bottom: '24px',
        right: '24px',
        zIndex: 99,
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            cursor: 'pointer'
        }
    };
    return <>
        {imageUrl && <CardMedia className={imageClass}
            image={imageUrl}
            title='Album cover image'
        />}
        {!imageUrl && <div style={{ height: '112px', backgroundColor: 'grey' }} />}
        {group && <BackLink groupId={group.id} className={textClass} />}
        {userIsAdmin && <Link href={href} as={asPath} style={linkStyle}>
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
        <Grid container>
            <Grid item md={11} xs={12}>
                <Typography gutterBottom variant='h4' color='inherit'>
                    <TextSkeleton isLoading={isLoading}>
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
        <AlbumImage imageClass={classes.groupMedia} buttonClass={classes.imageEdit}
            textClass={classes.groupText} album={album} />
        <AlbumContent contentClass={classes.content} textClass={classes.groupText} album={album} />
    </Card>
}

export default AlbumHeaderLayout;