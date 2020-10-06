import React from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

import PrivatePage from '../../src/components-personal/PrivatePage';
import ProfileForm from '../../src/components-personal/ProfileForm';
import PasswordForm from '../../src/components-personal/PasswordForm';
import { useUserValue } from '../../src/data/userData';
import ProfileDeleteForm from '../../src/components-personal/ProfileDeleteForm';

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

const gridStyle = { minHeight: '32px' };

const EditProfileMain = () => {
    const classes = useStyles();
    const user = useUserValue();
    const { profile } = user;

    return (
        <main>
            <Toolbar />
            <Grid container className={classes.container}>
                <Grid item md={3} xs={12}>
                    <Hidden smDown>
                        <Typography variant='h4' className={classes.sectionTitle} color='textSecondary'>
                            Naam en foto
                        </Typography>
                    </Hidden>
                </Grid>
                <Grid item md={1} />
                <Grid item md={8} xs={12}>
                    <ProfileForm {...profile} />
                </Grid>
            </Grid>
            <Grid container className={classes.container}>
                <Grid item md={3} xs={12} style={gridStyle}>
                    <Hidden smDown>
                        <Typography variant='h4' className={classes.sectionTitle} color='textSecondary'>
                            Wachtwoord veranderen
                        </Typography>
                    </Hidden>
                </Grid>
                <Grid item md={1} />
                <Grid item md={8} xs={12}>
                    <PasswordForm />
                </Grid>
            </Grid>
            <Grid container className={classes.container}>
                <Grid item md={3} xs={12} style={gridStyle}>
                    <Hidden smDown>
                        <Typography variant='h4' className={classes.sectionTitle} color='textSecondary'>
                            Account verwijderen
                        </Typography>
                    </Hidden>
                </Grid>
                <Grid item md={1} />
                <Grid item md={8} xs={12}>
                    <ProfileDeleteForm />
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