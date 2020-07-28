import React, { useState } from 'react';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery, Chip } from '@material-ui/core';

import { useUserValue } from '../../src/data/userData';
import { AvatarSkeleton } from '../../src/components-generic/Skeleton';
import { initials } from '../../src/components-generic/helpers';
import { useRecoilValueLoadable } from 'recoil';
import { activeGroupMembers } from '../data/activeTree-Group';

const useStyles = makeStyles(theme => ({
    panel: {
        flexDirection: 'column',
        padding: theme.spacing(1, 0.5, 2, 2),
    },
    line: {
        position: 'relative',
        height: '64px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        border: '1px solid white',
        fontSize: '12px',
        marginRight: theme.spacing(1),
    },
    name: {
        flexGrow: 1,
    },
    badge: {
        position: 'absolute',
        bottom: theme.spacing(1),
        left: theme.spacing(3),
        fontSize: '18px',
        color: theme.palette.text.primary,
    },
    badgeInvite: {
        position: 'absolute',
        top: theme.spacing(1),
        left: theme.spacing(3),
        fontSize: '18px',
        color: theme.palette.text.primary,
    }
}));

const widthStyle = (width) => ({
    width: `${width}px`,
    textAlign: 'right',
    marginLeft: '8px',
});
const smallFont = { fontSize: '70%' };
const widthStyle200Left = { ...widthStyle(200), textAlign: 'left' };
const widthStyle120 = widthStyle(120);
const redStyle = { color: 'red' };
const leftSpace = { marginLeft: '8px' };

const MemberLine = ({ member, currentIsAdmin, isCurrent, onClick, isLoading, isLarge }) => {
    const isAdmin = (member.role === 'admin');
    const isInvite = (member.status === 'invite');
    const classes = useStyles();

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e, member);
    }

    return <div className={classes.line}>
        <AvatarSkeleton alt={member.name} src={member.avatar}
            className={classes.avatar} isLoading={isLoading}>
            {(!member.avatar && initials(member.name))}
        </AvatarSkeleton>
        {(isInvite) && <Tooltip title='invited' aria-label='invited' className={classes.badgeInvite}>
            <Icon>mail</Icon>
        </Tooltip>}
        {(!isAdmin) && <Tooltip title='guest access' aria-label='guest access' className={classes.badge}>
            <Icon>visibility</Icon>
        </Tooltip>}
        <Typography className={classes.name}>
            {member.name}
            {isCurrent && <Chip size='small' label='me' component='span' style={leftSpace} />}
            {!isAdmin && <span style={smallFont}>{' (guest)'}</span>}
            {!isLarge && <>
                <br />
                <span style={smallFont}>{member.createdAt}</span>
            </>}
        </Typography>
        {isLarge && <Typography variant='caption' style={widthStyle200Left}>
            {member.email}
        </Typography>}
        {isLarge && <Typography variant='caption' style={widthStyle120}>
            {(member.status === 'invite' ? 'invited ' : 'since ') + member.createdAt}
        </Typography>}
        <div style={widthStyle(48)}>
            {(currentIsAdmin || isCurrent) &&
                <IconButton color='primary' disabled={!currentIsAdmin && !isCurrent}
                    onClick={handleClick}>
                    <Icon>more_horiz</Icon>
                </IconButton>}
        </div>
    </div>
}

const MemberDetails = () => {
    const classes = useStyles();
    const isLarge = useMediaQuery(theme => theme.breakpoints.up('sm'));

    const currentUser = useUserValue();
    const { profile } = currentUser;

    const membersData = useRecoilValueLoadable(activeGroupMembers);
    const hasValue = (membersData.state === 'hasValue');

    const members = (hasValue) ? membersData.contents : [];
    const currentIsAdmin = !!members.find(member => (
        member.PK.slice(3) === profile.id &&
        member.role === 'admin' &&
        member.status !== 'invite'
    ));

    const hasOtherAdmin = !!members.find(member => (
        member.PK.slice(3) !== profile.id &&
        member.role === 'admin' &&
        member.status !== 'invite'
    ));
    const [anchor, setAnchor] = useState({ el: null });

    const selectedIsCurrent = anchor.member && (anchor.member.SK.slice(1) === profile.id);
    const selectedIsAdmin = anchor.member && (anchor.member.role === 'admin');
    const selectedIsInvite = anchor.member && (anchor.member.status === 'invite');
    const roleText = (selectedIsAdmin) ? 'Make guest' : 'Make admin';
    const redText = (selectedIsInvite) ? 'Uninvite' : 'Ban';
    const open = Boolean(anchor.el);

    const onClick = (e, member) => {
        setAnchor({ el: e.currentTarget, member });
    };

    const handleClose = () => setAnchor({ ...anchor, el: null });

    return <ExpansionPanelDetails className={classes.panel}>
        {members.map(member => (
            <MemberLine key={member.PK || 'header'} member={member} onClick={onClick}
                currentIsAdmin={currentIsAdmin} isLoading={!hasValue}
                isCurrent={(member.PK.slice(3) === profile.id)}
                isLarge={isLarge}
            />
        ))}
        <Menu
            id="simple-menu"
            anchorEl={anchor.el}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            open={open}
            onClose={handleClose}
        >
            {selectedIsCurrent &&
                <MenuItem disabled={!hasOtherAdmin}>Leave this group</MenuItem>}
            {!selectedIsCurrent && !selectedIsInvite && <MenuItem>{roleText}</MenuItem>}
            {!selectedIsCurrent &&
                <MenuItem style={redStyle}>{redText}</MenuItem>}
        </Menu>
    </ExpansionPanelDetails>
}

export default MemberDetails;