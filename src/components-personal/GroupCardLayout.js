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
        background: 'linear-gradient(308deg, rgba(88,163,69,1) 14%, rgba(151,164,71,1) 43%, rgba(100,105,167,1) 77%)',
        color: 'white',
        height: '200px',
        width: '100%',
    },
    chip: {
        position: 'absolute',
        top: theme.spacing(1),
        left: theme.spacing(1),
        zIndex: 99,
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
    const classes = useStyles();
    return <>
        {(image?.url || isInvite) && <ClubImage className={classes.media}
            src={image?.url || '/img/confidential.jpg'}
            width={340}
            height={200}
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

    return <Card className={classes.card}>
        {(newPicsCount > 0) && <Chip color='secondary' label={newPicsCount} className={classes.chip} />}
        {(withEdit) ?
            <CardActionArea style={fullHeight} onClick={onClick}>
                <GroupCardContent {...props} />
            </CardActionArea>
            : <GroupCardContent {...props} onClick={onClick} />
        }
        {mayEdit && <IconButton size='small' className={classes.imageEdit}
            onClick={onClickEdit}>
            <Icon fontSize='small'>edit</Icon>
        </IconButton>}

    </Card>
}

export default GroupCardLayout;