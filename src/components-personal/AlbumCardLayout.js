import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

import { TextSkeleton } from '../../src/components-generic/Skeleton';
import { ClubImage } from '../components-generic/imageProvider';
import { useSetLoadingPath } from '../data/loadingData';

const useStyles = makeStyles(theme => ({
    card: {
        position: 'relative',
        // backgroundColor: theme.palette.background.paper,
        // height: '370px',
    },
    image: {
        background: 'linear-gradient(308deg, rgba(70,52,78,1) 14%, rgba(90,85,96,1) 43%, rgba(157,141,143,1) 77%)',
        height: '200px',
        backgroundSize: 'cover',
    },
    actionArea: {
        // height: '500px'
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
    chip: {
        position: 'absolute',
        top: theme.spacing(1),
        left: theme.spacing(1),
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        flex: 1
    },
    textSmall: {
        fontSize: '80%',
        color: 'darkgrey'
    }
}));

const flexEndStyle = { display: 'flex', justifyContent: 'flex-end' };

const AlbumCardContent = (props) => {
    const { name, sortDate, image, stats, newPicsCount, isLoading, isMedium, hideNew } = props;
    const year = sortDate? sortDate.slice(0,4) : '';
    const classes = useStyles();
    return <>
        {(image?.url) ?
            <ClubImage className={classes.image}
                src={image.url}
                width={(isMedium) ? 300 : 600}
                height={(isMedium) ? 250 : 500}
            />
            : <div className={classes.image} />
        }
        <CardContent className={classes.content}>
            {(newPicsCount > 0) && !hideNew &&
                <Chip color='secondary' label={newPicsCount} className={classes.chip} />
            }
            <Typography gutterBottom variant='h6' component='h5' className={classes.title}>
                <TextSkeleton className={classes.name} isLoading={isLoading}>{name}</TextSkeleton>
                <TextSkeleton className={classes.textSmall} isLoading={isLoading}>{year}</TextSkeleton>
            </Typography>
            <div style={flexEndStyle}>
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
    const { groupId, albumId, userIsAdmin, withEdit } = props;
    const mayEdit = (userIsAdmin && withEdit);
    const classes = useStyles();
    const setLoadingPath = useSetLoadingPath();

    const detailUrl = `/personal/groups/[id]/albums/[albumid]`;

    const onClick = (e) => {
        e.preventDefault();
        setLoadingPath(detailUrl, detailUrl.replace('[id]', groupId).replace('[albumid]', albumId));
    }

    const onClickEdit = (e) => {
        e.preventDefault();
        const editUrl = detailUrl + '/edit';
        setLoadingPath(editUrl, editUrl.replace('[id]', groupId).replace('[albumid]', albumId));
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