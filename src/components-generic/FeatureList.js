import React from "react";
import {
    List, ListItem, ListItemAvatar, ListItemText, Typography, Icon,
    makeStyles,
    ListItemSecondaryAction,
    IconButton,
    Hidden
} from "@material-ui/core";

import { useFeaturesAPI, useFeaturesValue } from '../data/featuresData';
import { AvatarSkeleton } from "../components-generic/Skeleton";
import { initials } from './helpers';

const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%',
        padding: theme.spacing(1),
    },
    item: {
        margin: theme.spacing(1, 0),
        backgroundColor: theme.palette.background.paper,
    },
    actions: {
        right: theme.spacing(1),
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            top: theme.spacing(7),
        },
        [theme.breakpoints.up('sm')]: {
            top: theme.spacing(4),
        },
        alignItems: 'center'
    },
    inline: {
        display: 'inline',
    },
    votes: {
        fontSize: '80%',
        height: theme.spacing(5),
        paddingRight: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    response: {
        width: '100%', fontStyle: 'italic'
    }
}));


const Votes = ({ count }) => {
    const classes = useStyles();
    return <div className={classes.votes}>
        {`+ ${count}`}
    </div>
}

const iconFrom = (status) => (
    (status === 'in progress') ? 'flight_takeoff'
        : (status === 'completed') ? 'flight_land'
            : 'timer'
);
const statusText = (status) => (
    (status === 'in progress') ? 'vertrokken'
        : (status === 'completed') ? 'geland'
            : 'ingediend'
);

const statusEmoji = (status) => (
    (status === 'in progress') ? '🚧 '
        : (status === 'completed') ? '✅ '
            : '📥 '
);

const Feature = ({ data }) => {
    const classes = useStyles();
    const featuresAPI = useFeaturesAPI();
    const user = data.user;
    const descriptionLines = (data.description) ?
        data.description.split('\n') : [];

    const onVote = (SK) => async () => {
        await featuresAPI.upvote({ SK });
    };
    const Descriptions = ({ lines }) => {
        return <>
            {` - `}
            {lines.map((line, i) => <React.Fragment key={i}>
                {line}
                {(i + 1 < lines.length) && <br />}
            </React.Fragment>)}
        </>
    }

    return <ListItem alignItems="flex-start" className={classes.item}>
        <Hidden smDown>
            <ListItemAvatar>
                <Votes count={data.votes} />
            </ListItemAvatar>
        </Hidden>
        <ListItemAvatar>
            <div>
                <AvatarSkeleton alt={user.name} src={user.photoUrl}>
                    {(!user.photoUrl && initials(user.name))}
                </AvatarSkeleton>
                <Hidden smUp>
                    <Votes count={data.votes} />
                </Hidden>
            </div>
        </ListItemAvatar>
        <ListItemText
            primary={<>
                {statusEmoji(data.status)}
                {data.title}
                <Typography
                    component="span"
                    variant="caption"
                    className={classes.inline}
                    color="textPrimary"
                >
                    {` - ${data.createdAt}`}
                </Typography>
            </>}
            secondary={
                <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        {user.name}
                    </Typography>
                    {(data.description) && <Descriptions lines={descriptionLines} />}
                    <br />
                    {data.comment && <><br />
                        <Typography component='span' variant='body2' className={classes.response}>
                            {data.comment}
                        </Typography></>
                    }
                </React.Fragment>
            }
        />
        <ListItemSecondaryAction className={classes.actions}>
            <Hidden smDown>{statusText(data.status)}{'\u00A0'}</Hidden>
            <Icon>{iconFrom(data.status)}</Icon>
            <IconButton color='primary'
                onClick={onVote(data.SK)}
                disabled={!data.options.includes('vote')}>
                <Icon>plus_one</Icon>
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
};

const FeatureList = () => {
    const classes = useStyles();
    const featuresData = useFeaturesValue();
    const features = featuresData.contents || [];
    return <List className={classes.list}>
        {features.map(feat => (
            <Feature data={feat} key={feat.SK} />
        ))}
    </List>
};

export default FeatureList;