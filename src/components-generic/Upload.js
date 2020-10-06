import React from 'react';
import { bucket } from '../aws-amplify/config-env';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import { Storage } from "aws-amplify";
import { now } from './helpers';

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

const server = (photoMetadata) => ({
    url: `https://${bucket()}.s3.eu-central-1.amazonaws.com`,
    process: async (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
        try {
            const result = await Storage.put(file.name, file, {
                level: 'protected',
                contentType: file.type,
                metadata: photoMetadata,
                progressCallback(info) {
                    progress(true, info.loaded, info.total);
                },
            });
            load(result.key);
        } catch (err) {
            console.log({ err });
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

    const label = 'Drag & Drop photos or <span class="filepond--label-action"> Browse </span>';
    return <>
        <FilePond allowMultiple={allowMultiple} server={server(photoMetadata)} instantUpload={instantUpload}
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