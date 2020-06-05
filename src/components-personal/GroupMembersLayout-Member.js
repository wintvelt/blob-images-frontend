import React, { useState } from 'react';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

import { useUser } from '../../src/components-generic/UserContext';
import { AvatarSkeleton } from '../../src/components-generic/Skeleton';
import { useMediaQuery } from '@material-ui/core';

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

const initials = (name) => {
    if (!name) return '';
    return name.split(' ').map(word => {
        return word[0];
    }).filter(letter => {
        return letter && letter.match(/[A-zÀ-ú]/);
    }).join('')
}

const widthStyle = (width) => ({
    width: `${width}px`,
    textAlign: 'right',
    marginLeft: '8px',
});

const MemberLine = ({ member, currentIsAdmin, isLoading }) => {
    const user = member.user || {};
    const isLarge = useMediaQuery(theme => theme.breakpoints.up('sm'));
    const width = (isLarge) ? 100 : 58;
    const [isAdmin, setIsAdmin] = useState(member.role === 'admin');
    const classes = useStyles();
    const onCheck = () => setIsAdmin(!isAdmin);
    return <div className={classes.line}>
        <AvatarSkeleton alt={user.name} src={user.avatar}
            className={classes.avatar} isLoading={isLoading}>
            {(!user.image && initials(user.name))}
        </AvatarSkeleton>
        <Tooltip title='guest access' aria-label='guest' className={classes.badge}>
            <Icon>visibility</Icon>
        </Tooltip>
        <Typography className={classes.name}>
            {user.name}
            {!isLarge && <>
                <br />
                <span style={{ fontSize: '70%' }}>{member.createdAt}</span>
            </>}
        </Typography>
        {isLarge && <Typography variant='caption' style={widthStyle(120)}>
            {'since ' + member.createdAt}
        </Typography>}
        <IconButton color='primary' disabled={!currentIsAdmin} style={widthStyle(48)}>
            <Icon>more_horiz</Icon>
        </IconButton>
        {/* {JSON.stringify(member)} */}
    </div>
}

const MemberDetails = (props) => {
    const { members, isLoading } = props;
    const currentUser = useUser();
    const { profile } = currentUser;
    const currentIsAdmin = !!members.find(member => member.PK.slice(3) === profile.id);
    return <ExpansionPanelDetails style={{ flexDirection: 'column', padding: '8px 4px 16px 16px' }}>
        {/* <HeaderLine /> */}
        {members.map(member => (
            <MemberLine key={member.PK || 'header'} member={member}
                currentIsAdmin={currentIsAdmin} isLoading={isLoading}
            />
        ))}
    </ExpansionPanelDetails>
}

export default MemberDetails;