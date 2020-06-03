import React from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

import { Storage } from "aws-amplify";
import { now } from './helpers';

registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileRename, 
    FilePondPluginImageTransform
);

const fileRenameFunction = (file) => {
    const cleanFilename = file.name
        .replace('.jpeg', '.jpg')
        .replace(/\s/g,'+');
    return `${now()}-${cleanFilename}`;
};

const server = {
    url: 'https://blob-images.s3.eu-central-1.amazonaws.com',
    process: async (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
        try {
            const result = await Storage.put(file.name, file, {
                level: 'protected',
                contentType: file.type,
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
}

const Upload = ({ pond, 
        onAddFile, onRemoveFile, onProcessFile, 
        allowMultiple, allowImagePreview, instantUpload
    }) => {

    const label = 'Drag & Drop photos or <span class="filepond--label-action"> Browse </span>';
    return <>
        <FilePond allowMultiple={allowMultiple} server={server} instantUpload={instantUpload}
            ref={pond} 
            onaddfile={onAddFile} onremovefile={onRemoveFile} onprocessfile={onProcessFile}
            allowRevert={false}
            labelIdle={label}
            fileRenameFunction={fileRenameFunction} 
            allowImagePreview={allowImagePreview}/>
    </>
}

export default Upload;