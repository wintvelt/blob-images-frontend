import React, { useState } from 'react';
import AccordionDetails from '@material-ui/core/AccordionDetails';
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
import { useSnackbar } from 'notistack';
import { API } from 'aws-amplify';
import { useMembersValue, useReloadActiveMembers } from '../data/activeTree-GroupMembers';

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
        backgroundColor: 'rgba(255,255,255,0.1)'
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
    const isAdmin = (member.userRole === 'admin');
    const isInvite = (member.status === 'invite');
    const classes = useStyles();

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e, member);
    }

    return <div className={classes.line}>
        <AvatarSkeleton alt={member.name} src={member.image?.url}
            className={classes.avatar} isLoading={isLoading}>
            {(!member.image?.url && initials(member.name))}
        </AvatarSkeleton>
        {(isInvite) && <Tooltip title='uitgenodigd' aria-label='invited' className={classes.badgeInvite}>
            <Icon>mail</Icon>
        </Tooltip>}
        {(member.isFounder) && <Tooltip title='oprichter' aria-label='founder' className={classes.badgeInvite}>
            {/* <span>{'👑'}</span> */}
            <Icon>flare</Icon>
        </Tooltip>}
        {(!isAdmin) && <Tooltip title='gast' aria-label='guest access' className={classes.badge}>
            <Icon>visibility</Icon>
        </Tooltip>}
        <Typography className={classes.name}>
            {member.name}
            {isCurrent && <Chip size='small' label='me' component='span' style={leftSpace} />}
            {!isAdmin && <span style={smallFont}>{' (guest)'}</span>}
            {member.isFounder && <span style={smallFont}>{' (oprichter)'}</span>}
            {!isLarge && <>
                <br />
                <span style={smallFont}>{member.createdAt}</span>
            </>}
        </Typography>
        {isLarge && <Typography variant='caption' style={widthStyle200Left}>
            {member.email}
        </Typography>}
        {isLarge && <Typography variant='caption' style={widthStyle120}>
            {(member.status === 'invite' ? 'uitgenodigd ' : 'lid sinds ') + member.createdAt}
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
    const { enqueueSnackbar } = useSnackbar();
    const reloadMembers = useReloadActiveMembers();

    const currentUser = useUserValue();
    const { profile } = currentUser;

    const membersData = useMembersValue();
    const hasValue = (!!membersData.contents);

    const members = (hasValue) ? membersData.contents : [];
    const currentIsAdmin = !!members.find(member => (
        member.userId === profile.id &&
        member.userRole === 'admin' &&
        member.status !== 'invite'
    ));

    const hasOtherAdmin = !!members.find(member => (
        member.userId !== profile.id &&
        member.userRole === 'admin' &&
        member.status !== 'invite'
    ));
    const [anchor, setAnchor] = useState({ el: null });

    const selectedIsCurrent = anchor.member && (anchor.member.userId === profile.id);
    const selectedIsAdmin = anchor.member && (anchor.member.userRole === 'admin');
    const selectedIsInvite = anchor.member && (anchor.member.status === 'invite');
    const roleText = (selectedIsAdmin) ? 'Make guest' : 'Make admin';
    const redText = (selectedIsInvite) ? 'Uninvite' : 'Ban';
    const open = Boolean(anchor.el);

    const onClick = (e, member) => {
        setAnchor({ el: e.currentTarget, member });
    };

    const handleClose = () => setAnchor({ ...anchor, el: null });

    const onChangeRole = async () => {
        const memberId = anchor.member.userId;
        const memberName = anchor.member.name;
        const newRole = (selectedIsAdmin) ? 'guest' : 'admin';
        const apiPath = `/groups/${anchor.member.groupId}/membership`;
        try {
            await API.put('blob-images', apiPath, { body: { memberId, newRole } });
            enqueueSnackbar(`Status van ${memberName} is nu "${newRole}"`);
            reloadMembers();
        } catch (e) {
            enqueueSnackbar(`Niet gelukt om ${memberName} "${newRole}" te maken`, { variant: 'error' });
        }
        handleClose();
    };

    return <AccordionDetails className={classes.panel}>
        {members.map(member => (
            <MemberLine key={member.userId || 'header'} member={member} onClick={onClick}
                currentIsAdmin={currentIsAdmin} isLoading={!hasValue}
                isCurrent={(member.userId === profile.id)}
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
                <MenuItem disabled={!hasOtherAdmin}>Groep verlaten</MenuItem>}
            {!selectedIsCurrent && !selectedIsInvite &&
                <MenuItem onClick={onChangeRole}>{roleText}</MenuItem>
            }
            {!selectedIsCurrent &&
                <MenuItem style={redStyle}>{redText}</MenuItem>}
        </Menu>
    </AccordionDetails >
}

export default MemberDetails;