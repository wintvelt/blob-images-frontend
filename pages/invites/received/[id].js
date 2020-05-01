import React, { useContext, useState } from 'react';
import { UserContext } from '../../../src/UserContext';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Link from '../../../src/UnstyledLink';
import InviteForm from '../../../src/InviteForm';
import CardInvite from '../../../src/components-invite/CardInvite';
import SignupForm from '../../../src/components-login/Signup';
import LoginForm from '../../../src/components-login/LoginForm';

const ReceivedInvite = (props) => {
    const userContext = useContext(UserContext);
    const { user } = userContext;
    const { profile } = user;
    const { isNewInvite, invitorName, group, expirationDate, isToEmail } = props;
    const [showLogin, setShowLogin] = useState(false);

    const onClickShow = (e) => {
        e.preventDefault();
        setShowLogin(!showLogin);
    };
    const formTitle = () => {
        return <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography component="h1" variant="h4" color="primary">
                Sign up to join
            </Typography>
            <Typography variant="body2" align='right' style={{ flexGrow: 1 }}>
                Already have an account?
            </Typography>
            <Button onClick={onClickShow}>Login</Button>
        </div>
    }

    return (
        <main>
            <Toolbar />
            <Grid container>
                <Grid item md={1} />
                <Grid item md={11}>
                    <Link style={{ display: 'flex', alignItems: 'center', color: 'white' }}
                        title={`Back to album page`}
                        href={`/personal/groups/${1}/albums/${2}`}
                    >
                        <Icon color='secondary' style={{ margin: '0 8px' }}>arrow_back</Icon>
                        <Typography>{'Foto\'s van Blob - Blob in ..ergens..'}</Typography>
                    </Link>
                </Grid>
                <Grid item md={1} />
                <Grid item md={4} xs={12} style={{ marginTop: '16px' }}>
                    <CardInvite
                        invitorName={invitorName}
                        invitedGroup={group}
                        imageSrc='/img/cover.jpg'
                        expirationDate={expirationDate}
                        isHeader
                    />
                </Grid>
                <Grid item md={1} />
                <Grid item md={5} xs={12} style={{ marginTop: '16px' }}>
                    {(user.isAuthenticated) ?
                        <InviteForm {...props} />
                        : (user.isAuthenticating) ?
                            <div style={{
                                display: 'flex', height: '100%', color: 'grey',
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                                <CircularProgress color='inherit' />
                            </div>
                            : (showLogin) ?
                                <LoginForm 
                                    title={`Log in to join ${group}`}
                                    onSignup={onClickShow}
                                />
                                : <SignupForm
                                    title={formTitle}
                                    subtitle={`To join ${group} and start your own groups`}
                                />
                    }
                </Grid>
                <Grid item md={1} />
            </Grid>
        </main>
    )
}

export async function getServerSideProps(context) {
    const { params, res } = context;
    const { id } = params;
    const isValid = !(id === '1');
    if (!isValid) {
        res.writeHead(302, {
            Location: '/invites/invalid'
        });
        res.end();
    }
    const isToEmail = (id === '2');
    return {
        props: {
            isValid,
            invitorEmail: 'wintvelt@me.com',
            invitorName: 'Wouter',
            expirationDate: '2020-05-30',
            group: 'Blob',
            isToEmail
        }
    }
}

export default ReceivedInvite