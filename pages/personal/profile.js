import React from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

import PrivatePage from '../../src/components-personal/PrivatePage';
import ProfileForm from '../../src/components-personal/ProfileForm';
import PasswordForm from '../../src/components-personal/PasswordForm';
import { useUser } from '../../src/data/userData';

const useStyles = makeStyles(theme => ({
    container: {
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(3),
        },
    },
    sectionTitle: {
        paddingTop: theme.spacing(4.5),
    }
}))

const EditProfileMain = () => {
    const classes = useStyles();
    const user = useUser();
    const { profile } = user;

    return (
        <main>
            <Toolbar />
            <Grid container className={classes.container}>
                <Grid item md={3} xs={12}>
                    <Hidden smDown>
                        <Typography variant='h4' className={classes.sectionTitle} color='textSecondary'>
                            Profile details
                        </Typography>
                    </Hidden>
                </Grid>
                <Grid item md={1} />
                <Grid item md={8} xs={12}>
                    <ProfileForm {...profile} />
                </Grid>
            </Grid>
            <Grid container className={classes.container}>
                <Grid item md={3} xs={12} style={{ minHeight: '32px' }}>
                    <Hidden smDown>
                        <Typography variant='h4' className={classes.sectionTitle} color='textSecondary'>
                            Change password
                        </Typography>
                    </Hidden>
                </Grid>
                <Grid item md={1} />
                <Grid item md={8} xs={12}>
                    <PasswordForm />
                </Grid>
            </Grid>
        </main >
    )
}

const ProfilePage = () => {
    return <PrivatePage>
        <EditProfileMain />
    </PrivatePage>
}

export default ProfilePage;