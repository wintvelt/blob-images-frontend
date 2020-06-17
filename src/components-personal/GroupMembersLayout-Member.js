import React, { useState } from 'react';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

import { useUserValue } from '../../src/data/userData';
import { AvatarSkeleton } from '../../src/components-generic/Skeleton';
import { initials } from '../../src/components-generic/helpers';

const useStyles = makeStyles(theme => ({
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
        lineHeight: 'normal',
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
const panelStyle = { flexDirection: 'column', padding: '8px 4px 16px 16px' };
const redStyle = { color: 'red' };

const MemberLine = ({ member, currentIsAdmin, isCurrent, hasOtherAdmin, onClick, isLoading }) => {
    const user = member.user || {};
    const isLarge = useMediaQuery(theme => theme.breakpoints.up('sm'));
    const isAdmin = (member.role === 'admin');
    const isInvite = (member.status === 'invite');
    const classes = useStyles();

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e, member);
    }

    return <div className={classes.line}>
        <AvatarSkeleton alt={user.name} src={user.avatar}
            className={classes.avatar} isLoading={isLoading}>
            {(!user.image && initials(user.name))}
        </AvatarSkeleton>
        {(isInvite) && <Tooltip title='invited' aria-label='invited' className={classes.badgeInvite}>
            <Icon>mail</Icon>
        </Tooltip>}
        {(!isAdmin) && <Tooltip title='guest access' aria-label='guest access' className={classes.badge}>
            <Icon>visibility</Icon>
        </Tooltip>}
        <Typography className={classes.name}>
            {user.name}
            {!isAdmin && <span style={smallFont}>{' (guest)'}</span>}
            {!isLarge && <>
                <br />
                <span style={smallFont}>{member.createdAt}</span>
            </>}
        </Typography>
        {isLarge && <Typography variant='caption' style={widthStyle200Left}>
            {user.email}
        </Typography>}
        {isLarge && <Typography variant='caption' style={widthStyle120}>
            {(member.status === 'invite' ? 'invited ' : 'since ') + member.createdAt}
        </Typography>}
        <div style={widthStyle(48)}>
            {((currentIsAdmin && hasOtherAdmin) || isCurrent) &&
                <IconButton color='primary' disabled={!currentIsAdmin && !isCurrent}
                    onClick={handleClick}>
                    <Icon>more_horiz</Icon>
                </IconButton>}
        </div>
        {/* {JSON.stringify(member)} */}
    </div>
}

const MemberDetails = (props) => {
    const { members, isLoading } = props;
    const currentUser = useUserValue();
    const { profile } = currentUser;
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

    const selectedIsCurrent = anchor.member && (anchor.member.PK.slice(3) === profile.id);
    const selectedIsAdmin = anchor.member && (anchor.member.role === 'admin');
    const selectedIsInvite = anchor.member && (anchor.member.status === 'invite');
    const roleText = (selectedIsAdmin) ? 'Make guest' : 'Make admin';
    const redText = (selectedIsInvite) ? 'Uninvite' : 'Ban';
    const open = Boolean(anchor.el);

    const onClick = (e, member) => {
        setAnchor({ el: e.currentTarget, member });
    };

    const handleClose = () => setAnchor({ ...anchor, el: null });

    return <ExpansionPanelDetails style={panelStyle}>
        {/* <HeaderLine /> */}
        {members.map(member => (
            <MemberLine key={member.PK || 'header'} member={member} onClick={onClick}
                currentIsAdmin={currentIsAdmin} hasOtherAdmin={hasOtherAdmin} isLoading={isLoading}
                isCurrent={(member.PK.slice(3) === profile.id)}
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
            {selectedIsCurrent && <MenuItem>Leave this group</MenuItem>}
            {!selectedIsCurrent && !selectedIsInvite && <MenuItem>{roleText}</MenuItem>}
            {!selectedIsCurrent && <MenuItem style={redStyle}>{redText}</MenuItem>}
        </Menu>
    </ExpansionPanelDetails>
}

export default MemberDetails;