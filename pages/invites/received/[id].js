import React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';

import Link from '../../../src/UnstyledLink';
import InviteForm from '../../../src/InviteForm';
import CardInvite from '../../../src/components-invite/CardInvite';

const ReceivedInvite = (props) => {
    const { isNewInvite, invitorName, invitorEmail, group } = props;
    const title = (isNewInvite) ?
        'You are invited'
        : 'Already accepted';
    const subTitle = 'Looks like you already accepted your invitation from ' + invitorName
        + ' to join ' + group;
    const paragraph = <Typography variant="h5" color="textPrimary" paragraph>
        Login to check out {' '}
        <MuiLink href={'#' + group}>{group}'s page</MuiLink>
        {' '}
                directly
            </Typography>;
    return (
        <main>
            <Toolbar />
            <Container>
                <div style={{ height: '32px', zIndex: '99' }}>
                    <Link style={{ display: 'flex', alignItems: 'center', color: 'white' }}
                        title={`Back to album page`}
                        href={`/personal/groups/${1}/albums/${2}`}
                    >
                        <Icon color='secondary' style={{ margin: '0 8px' }}>arrow_back</Icon>
                        <Typography>{'Foto\'s van Blob - Blob in ..ergens..'}</Typography>
                    </Link>
                </div>
                <Grid container spacing={8} style={{ marginTop: 0, paddingTop: 0 }}>
                    <Grid item md={5} xs={12}>
                        <CardInvite
                            invitorName={invitorName}
                            invitedGroup={group}
                            // stats={['432 photos', 'since 1 Jan 1985']}
                            imageSrc='/img/cover.jpg'
                            isHeader
                        />
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <InviteForm {...props} />
                    </Grid>
                </Grid>
            </Container>
        </main>
    )
}

export async function getServerSideProps(context) {
    const { params, res } = context;
    const { id } = params;
    const [isValid, isOpen, isExpired] = (id === '1') ?
        [true, true, false]
        : (id === '2') ? [true, false, false]
            : (id === '3') ? [true, true, true]
                : [false, false, false];
    console.log({ id, isValid });
    if (!isValid) {
        res.writeHead(302, {
            Location: '/invites/invalid'
        });
        res.end();
    }
    return {
        props: {
            isValid, isOpen, isExpired,
            invitorEmail: 'wintvelt@me.com',
            invitorName: 'Wouter',
            group: 'Blob'
        }
    }
}

export default ReceivedInvite