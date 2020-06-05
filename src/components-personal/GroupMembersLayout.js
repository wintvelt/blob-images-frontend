import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';

import MemberDetails from './GroupMembersLayout-Member';
import { AvatarSkeleton } from '../../src/components-generic/Skeleton';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    skeleton: {
        height: '64px',
        width: '100%',
    },
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
    avatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        border: '1px solid white',
        fontSize: '12px',
    }
}));

const initials = (name) => {
    if (!name) return '';
    return name.split(' ').map(word => {
        return word[0];
    }).filter(letter => {
        return letter && letter.match(/[A-zÀ-ú]/);
    }).join('')
}

const MemberSummary = (props) => {
    const { avatarClass, panelTitleClass, summaryClass, members, isLarge, isLoading } = props;
    const maxAvatars = (isLarge) ? 10 : 5;
    return <ExpansionPanelSummary
        className={summaryClass}
        expandIcon={<Icon>expand_more</Icon>}
        aria-controls="panel1a-content"
        id="panel1a-header"
    >
        <Typography variant='subtitle1' color='textSecondary' className={panelTitleClass}>
            Members:
        </Typography>
        <AvatarGroup max={maxAvatars}>
            {members.map((member, i) => (
                <AvatarSkeleton key={member.name || i} alt={member.name} src={member.avatar}
                    className={avatarClass} isLoading={isLoading}>
                    {(!member.image && initials(member.name))}
                </AvatarSkeleton>
            ))}
        </AvatarGroup>
    </ExpansionPanelSummary>

}

const GroupMembersLayout = ({ members, isLoading }) => {
    const classes = useStyles();
    const isLarge = useMediaQuery(theme => theme.breakpoints.up('sm'));
    const membersData = (isLoading) ?
        [{}, {}, {}]
        : members.map(member => ({ ...member.user, role: member.role }));

    return <ExpansionPanel className={classes.panel}>
        <MemberSummary avatarClass={classes.avatar} panelTitleClass={classes.panelTitle} isLarge={isLarge}
            summaryClass={classes.summary} members={membersData} isLoading={isLoading} />
        <MemberDetails members={members} isLoading={isLoading}/>
    </ExpansionPanel>
}

export default GroupMembersLayout;