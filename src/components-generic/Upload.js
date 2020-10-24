import React from 'react';
import { bucket } from '../aws-amplify/config-env';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import { API } from "aws-amplify";
import { now } from './helpers';
import { errorLog } from '../helpers/errorLog';
import { useSnackbar } from 'notistack';

registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileRename,
    FilePondPluginImageTransform,
    FilePondPluginFileValidateType
);

const fileRenameFunction = (file) => {
    const cleanFilename = file.name
        .replace('.jpeg', '.jpg')
        .replace(/\s/g, '+');
    return `${now()}-${cleanFilename}`;
};

const server = (photoMetadata, enqueueSnackbar) => ({
    url: `https://${bucket()}.s3.eu-central-1.amazonaws.com`,
    process: async (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
        try {
            const headers = photoMetadata;
            const url = await API.post('blob-images', '/user/uploadurl', {
                body: {
                    filename: file.name,
                    headers
                },
            });
            console.log(url);

            const result = await fetch(url, {
                method: 'PUT',
                body: file,
                headers,
            });
            console.log({ result });
            load(file.name);

            // const result = await Storage.put(file.name, file, {
            //     level: 'protected',
            //     contentType: file.type,
            //     metadata: photoMetadata,
            //     progressCallback(info) {
            //         progress(true, info.loaded, info.total);
            //     },
            // });
            // console.log({result});
            // load(result.key);
        } catch (err) {
            errorLog(err);
            const errMsg = err.response?.data?.error;
            if (errMsg && errMsg.includes('maximum user photos')) {
                const maxNum = errMsg.slice(23).split(' ')[0];
                enqueueSnackbar(`Je hebt helaas het maximum van ${maxNum} foto\'s bereikt`);
            }
            error(err);
        }
        return {
            abort: () => {
                abort();
            }
        }
    },
    revert: async (uniqueFileId, load, error) => {
        try {
            // const result = await Storage.remove(uniqueFileId, {
            //     level: 'protected',
            // });
            load('deleted');
        } catch (err) {
            console.log({ err });
            error(err);
        }
    },
});

const Upload = ({ pond,
    onAddFile, onRemoveFile, onProcessFile,
    allowMultiple, allowImagePreview, instantUpload,
    photoMetadata
}) => {
    const { enqueueSnackbar } = useSnackbar();

    const label = 'Sleep foto\'s hierheen of <span class="filepond--label-action"> Open bestand </span>';
    return <>
        <FilePond allowMultiple={allowMultiple} server={server(photoMetadata, enqueueSnackbar)}
            instantUpload={instantUpload}
            ref={pond}
            onaddfile={onAddFile} onremovefile={onRemoveFile} onprocessfile={onProcessFile}
            allowRevert={false}
            labelIdle={label}
            fileRenameFunction={fileRenameFunction}
            allowImagePreview={allowImagePreview}
            acceptedFileTypes={['image/*']}
        />
    </>
}

export default Upload;