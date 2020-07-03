import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import { TextSkeleton } from '../../src/components-generic/Skeleton';
import { makeImageUrl } from '../../src/components-generic/imageProvider';

import Link from '../components-generic/Link';
import { useRecoilValueLoadable, useRecoilValue } from 'recoil';
import { activeAlbumState, hasAlbumData } from '../data/activeTree-Album';
import { activePathFront } from '../data/activeTreeRoot';

export const useAlbumHeaderStyles = makeStyles(theme => ({
    card: {
        position: 'relative',
        color: 'white',
        backgroundColor: theme.palette.background.paper,
        backgroundSize: 'cover',
        width: '100%',
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
        background: 'linear-gradient(308deg, rgba(70,52,78,1) 14%, rgba(90,85,96,1) 43%, rgba(157,141,143,1) 77%)',
        backgroundSize: 'cover',
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
        '&:hover': { color: theme.palette.primary.main }
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

export const AlbumImage = () => {
    const classes = useAlbumHeaderStyles();
    const albumData = useRecoilValueLoadable(activeAlbumState);
    const hasValue = hasAlbumData(albumData);
    const imgUrl = hasValue && albumData.contents.image?.image;
    const imageUrl = makeImageUrl(imgUrl, 1440, 320);

    return <>
        {hasValue && <CardMedia className={classes.groupMedia}
            image={imageUrl}
            title='Album cover image'
        />}
        {!hasValue && <div className={classes.groupMedia} />}
    </>
}

export const AlbumName = () => {
    const classes = useAlbumHeaderStyles();
    const albumData = useRecoilValueLoadable(activeAlbumState);
    const hasValue = hasAlbumData(albumData);
    const name = hasValue && albumData.contents.name;
    return <TextSkeleton isLoading={!hasValue}>
        {name}
    </TextSkeleton>
};

export const AlbumStats = () => {
    const classes = useAlbumHeaderStyles();
    const albumData = useRecoilValueLoadable(activeAlbumState);
    const hasValue = hasAlbumData(albumData);
    const stats = hasValue && albumData.contents.stats;
    if (!stats) return null;
    return <Typography variant="caption" color="inherit" component="p">
        {stats.map((stat) => (
            <React.Fragment key={stat}>{stat}<br /></React.Fragment>
        ))}
    </Typography>
};
const linkStyle = {
    position: 'absolute',
    bottom: '24px',
    right: '24px',
    zIndex: 99,
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
        cursor: 'pointer',
    }
};
export const AlbumEditButton = () => {
    const classes = useAlbumHeaderStyles();
    const albumData = useRecoilValueLoadable(activeAlbumState);
    const hasValue = hasAlbumData(albumData);
    const userIsAdmin = hasValue && albumData.contents.userIsAdmin;
    const paths = useRecoilValue(activePathFront);
    if (!userIsAdmin) return null;
    return <Link href={paths.path + '/edit'} as={paths.asPath + '/edit'} style={linkStyle}>
        <IconButton size='small' className={classes.imageEdit}>
            <Icon fontSize='small'>edit</Icon>
        </IconButton>
    </Link>
};