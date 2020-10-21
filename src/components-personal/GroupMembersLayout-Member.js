import React, { useState } from 'react';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery, Chip, Link } from '@material-ui/core';

import { AvatarSkeleton } from '../../src/components-generic/Skeleton';
import { initials } from '../../src/components-generic/helpers';
import { useSnackbar } from 'notistack';
import { useMembersValue, useMemberUpdate } from '../data/activeTree-GroupMembers';
import DeleteDialog from '../components-generic/DeleteDialog';
import { useSetLoadingPath } from '../data/loadingData';

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
const widthStyle160 = widthStyle(160);
const redStyle = { color: 'red' };
const leftSpace = { marginLeft: '8px' };

const MemberLine = ({ member, onClick, isLoading, isLarge }) => {
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
            {member.isCurrent && <Chip size='small' label='me' component='span' style={leftSpace} />}
            {(!isAdmin || isInvite) && <span style={smallFont}>{
                (isInvite ? ' (uitgenodigd als ' : ' (') + (isAdmin ? 'admin)' : 'gast)')
            }</span>}
            {member.isFounder && <span style={smallFont}>{' (oprichter)'}</span>}
            {!isLarge && <>
                <br />
                <span style={smallFont}>{member.createdAt}</span>
            </>}
        </Typography>
        {isLarge && <Typography variant='caption' style={widthStyle200Left}>
            {!member.isCurrent && <Link href={`mailto: ${member.name} <${member.email}>`}>{member.email}</Link>}
            {member.isCurrent && member.email}
        </Typography>}
        {isLarge && <Typography variant='caption' style={widthStyle160}>
            {(member.status === 'invite' ? 'uitgenodigd ' : 'lid sinds ') + member.createdAt}
        </Typography>}
        <div style={widthStyle(48)}>
            {(member.options.length > 0) &&
                <IconButton color='primary' onClick={handleClick}>
                    <Icon>more_horiz</Icon>
                </IconButton>}
        </div>
    </div>
}

const makeDialogItems = (state) => {
    switch (state) {
        case 'ban': {
            return [
                ['Als je een lid uit de groep verwijdert, verdwijnen ook hun foto\'s uit de groep',
                    'Dit is definitief en omomkeerbaar',
                    'Je kunt het lid wel weer opnieuw uitnodigen, maar dan moet hij/zij foto\'s weer opnieuw toevoegen'
                ],
                'Yes, verban dit lid'
            ];
        }
        case 'leave': {
            return [
                [
                    'Als je de groep verlaat, is dat definitief. Je foto\'s verdwijnen dan ook uit de groep',
                    'Je kunt een ander lid vragen om je opnieuw uit te nodigen',
                    'Foto\'s moet je dan wel opnieuw toevoegen'
                ],
                'Yes, verlaat groep'
            ]
        }
        case 'uninvite': {
            return [
                [
                    'Als je de uitnodiging intrekt, krijgt het aspirantlid hiervan bericht.'
                ],
                'Yes, trek uitnodiging in'
            ]
        }
        case 'founderify': {
            return [
                [
                    'Als je een ander lid oprichter maakt, dan krijgt deze geluksvogel ook admin rechten.',
                    'En het recht om de groep op te heffen en verwijderen van clubalmanac.',
                    'Jouw eigen status als oprichter vervalt dan.'
                ],
                'Yes, maak oprichter'
            ]
        }

        default:
            return [[], ''];
    }
};

const MemberDetails = () => {
    const classes = useStyles();
    const isLarge = useMediaQuery(theme => theme.breakpoints.up('sm'));
    const { enqueueSnackbar } = useSnackbar();
    const setLoadingPath = useSetLoadingPath();
    const memberUpdate = useMemberUpdate();

    const membersData = useMembersValue();
    const hasValue = (!!membersData.contents);

    const members = (hasValue) ? membersData.contents : [];

    const [dialog, setDialog] = useState('closed');
    const onOpen = (state) => () => setDialog(state);
    const onClose = () => {
        handleClose();
        setDialog('closed');
    };
    const onMakeFounder = async () => {
        const memberId = anchorMem.userId;
        const memberName = anchorMem.name;
        const saveResult = await memberUpdate.save(memberId, { makeFounder: true });
        if (saveResult.success) {
            enqueueSnackbar(`Status van ${memberName} is nu "✨ oprichter ✨"`);
        } else {
            enqueueSnackbar(`Niet gelukt om ${memberName} oprichter te maken`, { variant: 'error' });
        }
        onClose();
    };

    const onDelete = async () => {
        const memberId = anchorMem.userId;
        const memberName = anchorMem.name;
        const delResult = await memberUpdate.delete(memberId);
        if (delResult.success) {
            if (anchorMem.isCurrent) {
                enqueueSnackbar('Je hebt de groep verlaten');
                setLoadingPath('/personal/groups')
            } else {
                enqueueSnackbar(`${memberName} is verwijderd uit de groep`);
            };
        } else {
            enqueueSnackbar(`Niet gelukt om ${memberName} te verwijderen`, { variant: 'error' });
        }
        onClose();
    };
    const onConfirm = async () => {
        if (dialog === 'founderify') {
            onMakeFounder();
        } else {
            onDelete();
        }
    };

    const [dialogLines, submitText] = makeDialogItems(dialog);

    const [anchor, setAnchor] = useState({ el: null });
    const anchorMem = anchor.member;
    const anchorOptions = anchorMem?.options || [];

    const open = Boolean(anchor.el);

    const onClick = (e, member) => {
        setAnchor({ el: e.currentTarget, member });
    };

    const handleClose = () => setAnchor({ ...anchor, el: null });

    const onChangeRole = async () => {
        const memberId = anchorMem.userId;
        const memberName = anchorMem.name;
        const newRole = (anchorMem.userRole === 'admin') ? 'guest' : 'admin';
        const saveResult = await memberUpdate.save(memberId, { newRole });
        if (saveResult.success) {
            enqueueSnackbar(`Status van ${memberName} is nu "${newRole}"`);
        } else {
            enqueueSnackbar(`Niet gelukt om ${memberName} "${newRole}" te maken`, { variant: 'error' });
        }
        handleClose();
    };

    return <AccordionDetails className={classes.panel}>
        {members.map(member => (
            <MemberLine key={member.userId || 'header'} member={member} onClick={onClick}
                isLoading={!hasValue} isLarge={isLarge}
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
            disabled={anchorOptions.length === 0}
        >
            {anchorOptions.includes('leave') &&
                <MenuItem onClick={onOpen('leave')}>Groep verlaten</MenuItem>}
            {anchorOptions.includes('guestify') &&
                <MenuItem onClick={onChangeRole}>Maak gast</MenuItem>
            }
            {anchorOptions.includes('adminify') &&
                <MenuItem onClick={onChangeRole}>Maak admin</MenuItem>
            }
            {anchorOptions.includes('founderify') &&
                <MenuItem onClick={onOpen('founderify')}>Benoem als oprichter</MenuItem>
            }
            {anchorOptions.includes('ban') &&
                <MenuItem style={redStyle} onClick={onOpen('ban')}>Verban uit groep</MenuItem>}
            {anchorOptions.includes('uninvite') &&
                <MenuItem style={redStyle} onClick={onOpen('uninvite')}>Toch niet uitnodigen</MenuItem>}
        </Menu>
        <DeleteDialog
            open={dialog !== 'closed'}
            onClose={onClose}
            onDelete={onConfirm}
            title='Weet je het zeker?'
            lines={dialogLines}
            abortText='OK toch maar niet'
            submitText={submitText}
        />
    </AccordionDetails >
}

export default MemberDetails;