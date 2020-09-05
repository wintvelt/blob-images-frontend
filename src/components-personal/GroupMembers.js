import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import MemberDetails from './GroupMembersLayout-Member';
import { MemberAvatarGroup, MemberActions } from './GroupMembersLayout';

const useStyles = makeStyles(theme => ({
    panel: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        margin: theme.spacing(2, 0),
    },
    summary: {
        height: '64px',
    },
    panelTitle: {
        alignSelf: 'center',
        marginRight: theme.spacing(2),
    },
}));

const GroupMembers = () => {
    const classes = useStyles();

    return <Accordion className={classes.panel}>
        <AccordionSummary
            className={classes.summary}
            expandIcon={<Icon>expand_more</Icon>}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <Typography variant='subtitle1' color='textSecondary' className={classes.panelTitle}>
                Leden:
            </Typography>
            <MemberAvatarGroup />
        </AccordionSummary>
        <MemberDetails />
        <MemberActions />
    </Accordion>
}

export default GroupMembers;