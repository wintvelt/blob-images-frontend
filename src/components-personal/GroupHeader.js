import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { GroupImage, GroupName, GroupDescription, GroupEditButton, GroupStats } from './GroupHeaderLayout';

const useStyles = makeStyles(theme => ({
    card: {
        position: 'relative',
        // backgroundColor: theme.palette.background.paper,
        background: 'linear-gradient(308deg, rgba(88,163,69,1) 14%, rgba(151,164,71,1) 43%, rgba(100,105,167,1) 77%)',
        width: '100%',
        height: '384px',
        boxShadow: 'none',
    },
    content: {
        position: 'relative',
        color: 'white',
        padding: theme.spacing(8, 3, 3, 3),
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    },
}));

const GroupHeader = () => {
    const classes = useStyles();
    return <Card className={classes.card} square elevation={0}>
        <GroupImage />
        <GroupEditButton />
        <CardContent className={classes.content}>
            <Grid container>
                <Grid item md={11} xs={12}>
                    <Typography gutterBottom variant='h2' color='inherit'>
                        <GroupName />
                    </Typography>
                    <Typography variant="subtitle1" color="inherit" component="p">
                        <GroupDescription />
                    </Typography>
                </Grid>
                <Grid item md={1} xs={12}>
                    <GroupStats />
                </Grid>
            </Grid>
        </CardContent>
    </Card>
}

export default GroupHeader;