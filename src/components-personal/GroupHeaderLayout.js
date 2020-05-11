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

const useStyles = makeStyles(theme => ({
    card: {
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        height: '384px',
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
        marginLeft: theme.spacing(1),
    },
    groupText: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: theme.spacing(.4),
        borderRadius: theme.spacing(.5),
        textAlign: 'right',
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

const GroupImage = (props) => {
    const router = useRouter();
    const href = router.pathname + '/edit';
    const asPath = href.replace('[id]', router.query.id);
    const { imageClass, buttonClass, group } = props;
    const { data } = group;
    const { image, userIsAdmin } = data || {};
    const imageUrl = makeImageUrl(image, 1440, 384);

    return <>
        {imageUrl && <CardMedia className={imageClass}
            image={imageUrl}
            title='Group cover image'
        />}
        {imageUrl && userIsAdmin && <Link href={href} as={asPath}>
            <IconButton size='small' className={buttonClass} >
                <Icon fontSize='small' color='secondary'>edit</Icon>
            </IconButton>
        </Link>}
    </>
}

const GroupContent = (props) => {
    const { contentClass, textClass, group } = props;
    const { data, isLoading } = group;
    const { title, subtitle, stats } = data || {};
    return <CardContent className={contentClass}>
        <Grid container>
            <Grid item md={11} xs={12}>
                <Typography gutterBottom variant='h2' color='inherit'>
                    <TextSkeleton className={textClass} isLoading={isLoading}>
                        {title}
                    </TextSkeleton>
                </Typography>
                <Typography variant="subtitle1" color="inherit" component="p">
                    <TextSkeleton className={textClass} isLoading={isLoading}>
                        {subtitle}
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

const GroupHeaderLayout = ({ group }) => {
    const classes = useStyles();
    return <Card className={classes.card}>
        <GroupImage imageClass={classes.groupMedia} buttonClass={classes.imageEdit} group={group} />
        <GroupContent contentClass={classes.content} textClass={classes.groupText} group={group} />
    </Card>
}

export default GroupHeaderLayout;