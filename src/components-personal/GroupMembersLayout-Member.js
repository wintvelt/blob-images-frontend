import React, { useState } from 'react';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';

import { useUser } from '../../src/components-generic/UserContext';
import { AvatarSkeleton } from '../../src/components-generic/Skeleton';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    line: {
        height: '64px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    headerLine: {
        height: '32px',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
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
        <Typography className={classes.name}>
            {user.name}
            {!isLarge && <>
            <br/>
            <span style={{fontSize: '70%'}}>{member.createdAt}</span>
            </>}
        </Typography>
        {isLarge && <Typography variant='caption' style={widthStyle(80)}>
            {member.createdAt}
        </Typography>}
        <div style={{ ...widthStyle(width), textAlign: 'center' }}>
            <Switch color='primary'
                checked={isAdmin} disabled={!currentIsAdmin} onChange={onCheck} />
        </div>
        <Button style={widthStyle(64)} color='primary' disabled={!currentIsAdmin}>
            Ban
        </Button>
        {/* {JSON.stringify(member)} */}
    </div>
}

const HeaderLine = () => {
    const isLarge = useMediaQuery(theme => theme.breakpoints.up('sm'));
    const width = (isLarge) ? 100 : 58;
    const classes = useStyles();
    return <div className={classes.headerLine}>
        <div className={classes.name} />
        {isLarge && <div style={widthStyle(80)}>since</div>}
        <div style={{ ...widthStyle(width), textAlign: 'center' }}>
            admin
        </div>
        <div style={widthStyle(64)} />
        {/* {JSON.stringify(member)} */}
    </div>
}

const MemberDetails = (props) => {
    const { members, isLoading } = props;
    const currentUser = useUser();
    const { profile } = currentUser;
    const currentIsAdmin = !!members.find(member => member.PK.slice(3) === profile.id);
    return <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
        <HeaderLine />
        {members.map(member => (
            <MemberLine key={member.PK || 'header'} member={member}
                currentIsAdmin={currentIsAdmin} isLoading={isLoading}
            />
        ))}
    </ExpansionPanelDetails>
}

export default MemberDetails;