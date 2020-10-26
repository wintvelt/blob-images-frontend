import React from 'react';

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

import { useUserValue } from '../data/userData';

const useStyles = makeStyles(theme => ({
    form: {
        position: 'relative',
        padding: theme.spacing(3, 4, 4, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
}));

const StatLine = ({ label, value, withMax, mayUpload }) => {
    return <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
            <Typography variant='body2' align='right' color='textSecondary'>{label}</Typography>
        </Grid>
        <Grid item xs={6} md={8}>
            <Typography variant='body2'>
                {value}{' '}
                {value && withMax && !mayUpload && <span style={{ fontSize: '80%' }}>(max bereikt)</span>}
            </Typography>
        </Grid>
    </Grid>
}

const statConfig = [
    { label: 'email adres', key: 'email' },
    { label: 'lid sinds', key: 'createdAt' },
    { label: 'laatste bezoek', key: 'visitDatePrev' },
    { label: 'Foto\'s op clubalmanac', key: 'photoCount', withMax: true },
];

const UserStats = () => {
    const user = useUserValue();
    const { profile } = user;
    const classes = useStyles();

    return (
        <Paper className={classes.form}>
            {statConfig.map(it => <StatLine
                key={it.key}
                label={it.label} value={profile[it.key]} withMax={it.withMax}
                mayUpload={profile.mayUpload} />
            )}
        </Paper>
    )
};

export default UserStats;