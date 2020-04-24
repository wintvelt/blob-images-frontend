import React from 'react';
import Hero from '../../../src/components-home/Hero';
import SignupForm from '../../../src/components-login/Signup';
import LoginForm from '../../../src/components-login/LoginForm';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

const ReceivedInvite = (props) => {
    const { isValid, isOpen, isExpired, invitorName, invitorEmail, group } = props;
    const title = (!isValid) ? 'Oops'
        : (isOpen) ?
            (isExpired) ? 'Welcome' :
                'You are invited!'
            : 'Already accepted';
    const subTitle = (!isValid) ? 'This invite is not valid'
        : (isOpen) ?
            (isExpired) ? 'Alas, the invite from ' + invitorName + ' has expired' :
                invitorName + ' invites you to join ' + group
            : 'Looks like you already accepted your invitation from ' + invitorName
            + ' to join ' + group;
    const paragraph = (!isValid) ? <Typography variant="h5" color="inherit" paragraph>
        If you received an email invite, maybe check the link again?
        </Typography>
        : (isOpen) ?
            (isExpired) ? <Typography variant="h5" color="inherit" paragraph>
                You could {' '}
                <MuiLink href={'mailto:' + invitorEmail}>
                    send{' '}{invitorName}{' '}an email
                    </MuiLink>
                {' '} and ask them to invite you again
            </Typography>
                : <Typography variant="h5" color="inherit" paragraph>
                    Sign up and enjoy shared photos
            </Typography>
            : <Typography variant="h5" color="inherit" paragraph>
                Login to check out {' '}
                <MuiLink href={'#' + group}>{group}'s page</MuiLink>
                {' '}
                directly
            </Typography>;
    return (
        <main>
            <Hero
                url='/cover_2.jpg'
                title={title}
                subTitle={subTitle}
                paragraph={paragraph}
            >
                {(!isValid) ?
                    <p>Request access to our beta</p>
                    : (isOpen) ?
                        (isExpired) ?
                            <p>expired invitation</p>
                            : <SignupForm subtitle={'Enter your info to create an account and join ' +
                                group + ' on Photo Duck'} />
                        : <LoginForm />
                }
            </Hero>
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