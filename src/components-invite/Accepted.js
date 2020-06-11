import React from 'react';

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Link from '../components-generic/Link';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
}));

const AcceptedCard = ({invite}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Typography component="h1" variant="h4"
                align='center' gutterBottom>
                Invite already accepted
            </Typography>
            <img src='/img/invite_divider.png' alt='divider' width={64} />
            <Typography paragraph variant='subtitle1'>
                You are already a member of{' '}
                {invite.group.name}
            </Typography>
            <Typography variant='body1' align='center'>
                So nothing to see here anymore<br/>
                <br/>
                You could check out {' '}
                <Link href='/personal/groups/[id]' as={`/personal/groups/${invite.group.id}`}>
                    {invite.group.name}
                </Link><br/>
                <br/>
                In any case, thank you for stopping by!
            </Typography>
            <img src='/img/invite_divider.png' alt='divider' width={64} />
        </Paper>
    )
};

export default AcceptedCard;