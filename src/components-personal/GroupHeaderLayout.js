import React from 'react';
import { useRecoilValueLoadable, useRecoilValue } from 'recoil';

import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import { TextSkeleton } from '../../src/components-generic/Skeleton';
import { makeImageUrl } from '../../src/components-generic/imageProvider';

import Link from '../components-generic/Link';
import { activeGroupState, hasGroupData } from '../data/activeTree-Group';
import { activePathFront } from '../data/activeTreeRoot';

const useStyles = makeStyles(theme => ({
    groupMedia: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%',
        zIndex: 0,
        backgroundSize: 'cover',
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
        textAlign: 'right',
    },
}));

export const GroupImage = () => {
    const classes = useStyles();
    const groupData = useRecoilValueLoadable(activeGroupState);
    const hasValue = hasGroupData(groupData);
    const image = hasValue && groupData.contents.image;
    if (hasValue && !groupData.contents) console.log({groupData});
    if (!image) return null;

    const imageUrl = makeImageUrl(image.image, 1440, 384);

    return <CardMedia className={classes.groupMedia}
        image={imageUrl}
        title='Group cover image'
    />
};

export const GroupEditButton = () => {
    const classes = useStyles();
    const groupData = useRecoilValueLoadable(activeGroupState);
    const hasValue = hasGroupData(groupData);
    const userIsAdmin = hasValue && groupData.contents.userIsAdmin;
    const paths = useRecoilValue(activePathFront);
    if (!userIsAdmin) return null;
    return <Link href={paths.path + '/edit'} as={paths.asPath + '/edit'}>
        <IconButton size='small' className={classes.imageEdit}>
            <Icon fontSize='small'>edit</Icon>
        </IconButton>
    </Link>
};


export const GroupName = () => {
    const classes = useStyles();
    const groupData = useRecoilValueLoadable(activeGroupState);
    const hasValue = hasGroupData(groupData);
    const name = hasValue && groupData.contents.name;
    return <TextSkeleton className={classes.groupText} isLoading={!hasValue}>
        {name}
    </TextSkeleton>
};

export const GroupDescription = () => {
    const classes = useStyles();
    const groupData = useRecoilValueLoadable(activeGroupState);
    const hasValue = hasGroupData(groupData);
    const description = hasValue && groupData.contents.description;
    return <TextSkeleton className={classes.groupText} isLoading={!hasValue}>
        {description}
    </TextSkeleton>
};

export const GroupStats = () => {
    const classes = useStyles();
    const groupData = useRecoilValueLoadable(activeGroupState);
    const hasValue = hasGroupData(groupData);
    const stats = hasValue && groupData.contents.stats;
    if (!stats) return null;
    return <Typography variant="caption" color="inherit" component="p"
        className={classes.groupText}>
        {stats.map((stat) => (
            <React.Fragment key={stat}>{stat}<br /></React.Fragment>
        ))}
    </Typography>
}