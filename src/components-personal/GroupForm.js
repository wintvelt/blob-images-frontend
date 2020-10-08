import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

import Form from '../components-generic/Form';
import { useSetLoadingPath } from '../data/loadingData';
import { useRecoilValueLoadable, useResetRecoilState } from 'recoil';
import { userGroups } from '../data/userData';
import { deleteGroup, useSaveGroup } from '../data/activeTree-Group';
import DeleteDialog from '../components-generic/DeleteDialog';

const fieldConfig = {
    name: {
        autoComplete: 'group-name',
        type: 'text',
        label: 'naam van de groep',
        validations: [{
            text: 'geef je groep een naam',
            validate: (val) => (!!val),
        }],
    },
    description: {
        autoComplete: 'group-description',
        type: 'text',
        label: 'omschrijving',
    },
    image: {
        autoComplete: 'group-image',
        type: 'image',
        isGroup: true,
        label: 'pic van de groep',
    },
};

const GroupForm = ({ group, isNew }) => {
    const groupId = group?.id;
    const setLoadingPath = useSetLoadingPath();
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const saveGroup = useSaveGroup();

    const userGroupsData = useRecoilValueLoadable(userGroups);
    const groups = (userGroupsData.state === 'hasValue') ? userGroupsData.contents : [];
    const reloadUserGroups = useResetRecoilState(userGroups);

    const [dialogOpen, setDialogOpen] = useState(false);

    const onSubmit = async (fields) => {
        setIsLoading(true);
        try {
            const newGroupId = await saveGroup(groupId, fields);
            const message = (isNew) ?
                (groups && groups.length > 0) ?
                    'nieuwe groep gesticht'
                    : 'top! je hebt net je eerste groep gemaakt'
                : 'wijzigingen opgeslagen';
            enqueueSnackbar(message, { variant: 'success' });
            if (isNew) {
                setLoadingPath(
                    '/personal/groups/[id]/albums/[albumid]/edit?new=true',
                    `/personal/groups/${newGroupId}/albums/new/edit?new=true`);
            };
            reloadUserGroups();
        } catch (e) {
            console.log(e.message);
            enqueueSnackbar('Er ging iets mis bij het opslaan', { variant: 'error' });
        }
        setIsLoading(false);
    }
    const onDelete = (e) => {
        try {
            const result = deleteGroup(groupId);
            setDialogOpen(false);
            enqueueSnackbar(`"${group.name}" is definitief verwijderd. Oud-leden zijn op de hoogte gebracht.`);
            setLoadingPath('/personal/groups');
        } catch (error) {
            console.log(error);
            enqueueSnackbar('Er ging iets mis bij het verwijderen van de groep', { variant: 'error' });
        }
    }
    const title = (isNew && userGroupsData.state === 'hasValue') ?
        (groups && groups.length > 0) ?
            'Profiel van je nieuwe groep'
            : 'Richt je eerste groep op!'
        : 'Groepsprofiel aanpassen';
    const submitText = (isNew) ? 'Nieuwe groep opslaan' : 'Wijzigingen opslaan';
    const onDialogOpen = (isNew || !group?.isFounder) ? undefined : () => setDialogOpen(true);
    const onDialogClose = () => setDialogOpen(false);

    return <>
        <Form
            title={title}
            formFields={fieldConfig}
            initialValues={group}
            isLoading={(!userGroupsData.state === 'hasValue') || isLoading}
            submitText={submitText}
            onSubmit={onSubmit}
            onDelete={onDialogOpen}
            deleteText='verwijder deze groep'
        />
        <DeleteDialog open={dialogOpen} onClose={onDialogClose} onDelete={onDelete}
            title={`Wil je "${group.name}" echt opheffen?`}
            lines={[
                'De foto\'s blijven bewaard. Maar alle albums in de groep worden verwijderd.',
                'De foto\'s zijn dan ook niet meer toegankelijk voor de leden van de groep.',
                'Alle huidige leden ontvangen bericht van het opheffen van de groep.',
            ]}
            abortText='OK, laat de groep dan maar bestaan'
            submitText='Zeker weten - verwijder deze groep'
        />

    </>
};

export default GroupForm