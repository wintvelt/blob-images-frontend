import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core';

import { BaseField, validateForm } from '../components-generic/FormField';
import FormButton from '../components-generic/FormButton';
import { useRecoilValue } from 'recoil';
import { activeGroupIdState } from '../data/activeTreeRoot';
import { useMembersValue } from '../data/activeTree-GroupMembers';
import { invitePromise } from '../data/invite-Data';

const useStyles = makeStyles(theme => ({
    form: {
        position: 'relative',
        padding: theme.spacing(3, 4, 4, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
}));

const smallFont = { fontSize: '80%' };

const inviteeFieldConfig = (index, memberEmails) => ({
    name: {
        autoComplete: `invitee-name-${index}`,
        type: 'text',
        label: 'naam',
        validations: [{
            text: 'voer een naam in (duh)',
            validate: (val) => (!!val),
        }],
        width: 5,
    },
    email: {
        autoComplete: `invitee-email-${index}`,
        type: 'email',
        label: 'email',
        validations: [
            {
                text: 'voer een geldig email adres in',
                validate: (val) => (
                    val &&
                    val.split('@')[1] && !!val.split('@')[1].split('.')[1]
                )
            },
            {
                text: 'er is al een groepslid met deze email',
                validate: (val) => {
                    return !memberEmails.includes(val);
                }
            },
        ],
        width: 5,
    },
    guestOnly: {
        autoComplete: `guest-only-${index}`,
        type: 'checkbox',
        label: <span style={smallFont}>gast-toegang</span>,
        width: 1,
    },
});

const initialInvitee = (idx) => ({
    name: '',
    email: '',
    guestOnly: false,
    idx
});

const gutterBottom = { marginBottom: '16px' };
const gridStyle = { marginTop: '20px', textAlign: 'end' };
const fullWidth = { width: '100%' };
const gutterTop = { marginTop: '16px' };
const labelStyle = { color: '#f44336', marginLeft: '12px' };

const InviteeLine = ({ invitee, onChange, onRemove, showValidation, showRemove, memberEmails }) => {
    const inviteeFields = inviteeFieldConfig(invitee.idx, memberEmails);
    return <Grid container spacing={1} style={gutterBottom}>
        {Object.keys(inviteeFields).map(fieldName => {
            const field = { ...inviteeFields[fieldName], value: invitee[fieldName] };
            return <Grid item md={field.width} key={fieldName}
                xs={(inviteeFields[fieldName].type === 'checkbox') ? 6 : 12}
                style={(inviteeFields[fieldName].type === 'checkbox') ? { marginTop: '14px' } : {}}>
                <BaseField
                    fieldName={fieldName}
                    field={field}
                    onChange={onChange(invitee.idx, fieldName)}
                    showValidation={showValidation} />
            </Grid>
        })}
        <Grid item md={1} xs={6} style={gridStyle}>
            {(showRemove) &&
                <IconButton size='small' onClick={onRemove(invitee.idx)}>
                    <Icon>close</Icon>
                </IconButton>
            }
        </Grid>
        <Hidden mdUp><Divider style={fullWidth} /></Hidden>
    </Grid>
};

const GroupInviteForm = ({ title }) => {
    const classes = useStyles();
    const groupId = useRecoilValue(activeGroupIdState);
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const [showValidation, setShowValidation] = useState(false);
    const membersData = useMembersValue();
    const memberEmails = (membersData.contents) ?
        membersData.contents.map(member => member.email) : [];

    const [invitees, setInvitees] = useState({ 0: initialInvitee(0, memberEmails) });
    const inviteeCount = Object.keys(invitees).length;
    const [message, setMessage] = useState('');

    const onChange = (idx, fieldName) => (e) => {
        const newValue = (fieldName === 'guestOnly') ? e.target.checked
            : (fieldName === 'email') ? e.target.value.toLowerCase()
                : e.target.value;
        const newInvitee = { ...invitees[idx], [fieldName]: newValue };
        setInvitees({ ...invitees, [idx]: newInvitee });
    };
    const onAdd = () => {
        const newIdx = Math.max(...Object.keys(invitees)) + 1;
        const newInvitees = { ...invitees, [newIdx]: initialInvitee(newIdx, memberEmails) };
        setInvitees(newInvitees);
    };
    const onRemove = (idx) => () => {
        let newInvitees = { ...invitees };
        delete newInvitees[idx];
        setInvitees(newInvitees);
    };
    const onChangeMessage = (e) => setMessage(e.target.value);

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        let cleanInvitees = { ...invitees };
        let isValidated = true;
        let inviteeEmails = [];
        Object.keys(invitees).forEach(key => {
            const invitee = invitees[key];
            const isEmptyAndNotLast = (!invitee.name && !invitee.email && Object.keys(cleanInvitees).length > 1);
            const isDuplicateEmail = invitee.email && inviteeEmails.includes(invitee.email);
            if (isEmptyAndNotLast || isDuplicateEmail) {
                delete cleanInvitees[key];
            } else {
                inviteeEmails.push(invitee.email);
                let fields = { ...inviteeFieldConfig(invitee.idx, memberEmails) };
                Object.keys(fields).forEach(fieldKey => {
                    fields[fieldKey].value = invitee[fieldKey];
                });
                const inviteeIsValidated = !!validateForm(fields);
                isValidated = isValidated && inviteeIsValidated;
            };
        });
        isValidated = isValidated && !!message;
        if (isValidated) {
            const cleanInviteCount = Object.keys(cleanInvitees).length;
            // send invites to API
            try {
                await Promise.all(Object.keys(cleanInvitees).map(key => {
                    const invitee = cleanInvitees[key];
                    const role = (invitee.guestOnly) ? 'guest' : 'admin';
                    return invitePromise({
                        groupId,
                        name: invitee.name,
                        email: invitee.email,
                        message,
                        role
                    });
                }));
                enqueueSnackbar(
                    `Uitnodiging${(cleanInviteCount !== '1') ? '' : 'en'} `+
                    `verstuurd aan ${cleanInviteCount} kandidaat-` +
                    `c`,
                    { variant: 'success' }
                );
            } catch (error) {
                enqueueSnackbar('Oeps, kon de uitnodigingen niet verzenden', { variant: 'error' })
            }
            setInvitees({ 0: initialInvitee(0, memberEmails) });
            setShowValidation(false);
            setMessage('');
        } else {
            setInvitees(cleanInvitees);
            setShowValidation(true);
        }
        setIsLoading(false);
    }
    const submitText = 'Verzenden';

    return (
        <form name='form' noValidate>
            <Paper className={classes.form}>
                <Typography component="h1" variant="h4"
                    align='left' gutterBottom>
                    {title}
                </Typography>
                {Object.keys(invitees).map(idx => (
                    <InviteeLine key={idx}
                        invitee={invitees[idx]}
                        onChange={onChange}
                        onRemove={onRemove}
                        showRemove={(inviteeCount > 1)}
                        showValidation={showValidation}
                        memberEmails={memberEmails}
                    />
                ))}
                <Button color='primary' onClick={onAdd}>Nog iemand uitnodigen</Button>
                <TextField
                    value={message}
                    onChange={onChangeMessage}
                    style={gutterTop}
                    variant='outlined'
                    label='goeie tekst door jou'
                    multiline
                    rows={6}
                    rowsMax={12}
                    error={showValidation && !message}
                />
                {showValidation && !message &&
                    <Typography variant='caption' style={labelStyle}>
                        Voeg een persoonlijke noot toe
                    </Typography>
                }
                <FormButton type='submit' isLoading={isLoading} onClick={onSubmit}>
                    {submitText}
                </FormButton>
            </Paper>
        </form>
    )
};

export default GroupInviteForm;