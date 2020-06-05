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

import { useUser } from '../../src/components-generic/UserContext';
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
    }
}));

const widthStyle = (width) => ({
    width: `${width}px`,
    textAlign: 'right',
    marginLeft: '8px',
});

const MemberLine = ({ member, currentIsAdmin, onClick, isLoading }) => {
    const user = member.user || {};
    const isLarge = useMediaQuery(theme => theme.breakpoints.up('sm'));
    const isAdmin = (member.role === 'admin');
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
        {(!isAdmin) && <Tooltip title='guest access' aria-label='guest' className={classes.badge}>
            <Icon>visibility</Icon>
        </Tooltip>}
        <Typography className={classes.name}>
            {user.name}
            {!isLarge && <>
                <br />
                <span style={{ fontSize: '70%' }}>{member.createdAt}</span>
            </>}
        </Typography>
        {isLarge && <Typography variant='caption' style={{ ...widthStyle(200), textAlign: 'left' }}>
            {user.email}
        </Typography>}
        {isLarge && <Typography variant='caption' style={widthStyle(120)}>
            {'since ' + member.createdAt}
        </Typography>}
        <div style={widthStyle(48)}>
            {currentIsAdmin && <IconButton color='primary' disabled={!currentIsAdmin}
                onClick={handleClick}>
                <Icon>more_horiz</Icon>
            </IconButton>}
        </div>
        {/* {JSON.stringify(member)} */}
    </div>
}

const MemberDetails = (props) => {
    const { members, isLoading } = props;
    const currentUser = useUser();
    const { profile } = currentUser;
    const currentIsAdmin = !!members.find(member => member.PK.slice(3) === profile.id);
    const [anchor, setAnchor] = useState({ el: null });

    const selectedIsAdmin = anchor.member && (anchor.member.role === 'admin');
    const menuText = (selectedIsAdmin)? 'Make guest' : 'Make admin';

    const onClick = (e, member) => {
        setAnchor({ el: e.currentTarget, member });
    };

    const handleClose = () => setAnchor({ el: null });

    return <ExpansionPanelDetails style={{ flexDirection: 'column', padding: '8px 4px 16px 16px' }}>
        {/* <HeaderLine /> */}
        {members.map(member => (
            <MemberLine key={member.PK || 'header'} member={member} onClick={onClick}
                currentIsAdmin={currentIsAdmin} isLoading={isLoading}
            />
        ))}
        <Menu
            id="simple-menu"
            anchorEl={anchor.el}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            open={Boolean(anchor.el)}
            onClose={handleClose}
        >
            <MenuItem>{menuText}</MenuItem>
            <MenuItem style={{ color: 'red' }}>Ban</MenuItem>
        </Menu>
    </ExpansionPanelDetails>
}

export default MemberDetails;