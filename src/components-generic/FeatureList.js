import {
    List, ListItem, ListItemAvatar, ListItemText, Typography, Icon,
    makeStyles,
    ListItemSecondaryAction,
    IconButton
} from "@material-ui/core";

import { useFeaturesAPI, useFeaturesValue } from '../data/featuresData';
import { AvatarSkeleton } from "../components-generic/Skeleton";

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
        display: 'flex',
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
        justifyContent: 'flex-end',
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
)

const Feature = ({ data }) => {
    const classes = useStyles();
    const featuresAPI = useFeaturesAPI();
    const user = data.user;

    const onVote = (SK) => async () => {
        await featuresAPI.upvote({ SK });
    }

    return <ListItem alignItems="flex-start" className={classes.item}>
        <ListItemAvatar>
            <Votes count={data.votes} />
        </ListItemAvatar>
        <ListItemAvatar>
            <AvatarSkeleton alt={user.name} src={user.photoUrl}>
                {(!user.photoUrl && initials(user.name))}
            </AvatarSkeleton>
        </ListItemAvatar>
        <ListItemText
            primary={<>
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
                    {(data.description) ? ` - ${data.description}` : ''}
                </React.Fragment>
            }
        />
        <ListItemSecondaryAction className={classes.actions}>
            <Icon fontSize='large'>{iconFrom(data.status)}</Icon>
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