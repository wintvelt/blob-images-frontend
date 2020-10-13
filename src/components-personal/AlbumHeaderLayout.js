import React from 'react';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import { TextSkeleton } from '../../src/components-generic/Skeleton';
import { ClubImage } from '../../src/components-generic/imageProvider';

import Link from '../components-generic/Link';
import { useRecoilValue } from 'recoil';
import { useActiveAlbumValue } from '../data/activeTree-Album';
import { activePathFront } from '../data/activeTreeRoot';

export const useAlbumHeaderStyles = makeStyles(theme => ({
    card: {
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        backgroundSize: 'cover',
        width: '100%',
        marginBottom: theme.spacing(1),
    },
    white: { color: 'white' },
    groupMedia: {
        height: '320px',
        background: 'linear-gradient(308deg, rgba(70,52,78,1) 14%, rgba(90,85,96,1) 43%, rgba(157,141,143,1) 77%)',
        backgroundSize: 'cover',
    },
    imageEdit: {
        backgroundColor: 'rgba(0,0,0,.2)',
        color: 'white',
        marginLeft: theme.spacing(1),
        '&:hover': { color: theme.palette.primary.main }
    },
}));

export const AlbumImage = () => {
    const classes = useAlbumHeaderStyles();
    const albumData = useActiveAlbumValue();
    const hasImage = !!albumData.contents?.image?.url;
    const album = albumData.contents || {};

    return <>
        {hasImage && <ClubImage className={classes.groupMedia}
            src={album.image?.url}
            width={1440}
            height={320}
            title='Album cover image'
        />}
        {!hasImage && <div className={classes.groupMedia} />}
    </>
}

export const AlbumName = () => {
    const albumData = useActiveAlbumValue();
    const hasValue = !!albumData.contents;
    const name = hasValue && albumData.contents.name;
    return <TextSkeleton isLoading={albumData.isLoading}>
        {name}
    </TextSkeleton>
};

export const AlbumStats = () => {
    const albumData = useActiveAlbumValue();
    const hasValue = !!albumData.contents;
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
    '&:hover': {
        cursor: 'pointer',
    }
};
export const AlbumEditButton = () => {
    const classes = useAlbumHeaderStyles();
    const albumData = useActiveAlbumValue();
    const hasValue = !!albumData.contents;
    const userIsAdmin = hasValue && albumData.contents.userIsAdmin;
    const paths = useRecoilValue(activePathFront);
    if (!userIsAdmin) return null;
    return <Link href={paths.path + '/edit'} as={paths.asPath + '/edit'} style={linkStyle}>
        <IconButton size='small' className={classes.imageEdit}>
            <Icon fontSize='small'>edit</Icon>
        </IconButton>
    </Link>
};