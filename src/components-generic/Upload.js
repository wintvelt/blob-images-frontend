import React from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';

import { Storage } from "aws-amplify";
import { now } from './helpers';

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileRename);

const fileRenameFunction = (file) => {
    return `${now()}-${file.name}`;
};

const server = {
    url: 'https://blob-images.s3.eu-central-1.amazonaws.com',
    process: async (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
        try {
            console.log(file.name);
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
            const result = await Storage.remove(uniqueFileId, {
                level: 'protected',
            });
            load('deleted');
        } catch (err) {
            console.log({ err });
            error(err);
        }
    },
}

const Upload = ({ pond, onAddFile }) => {
    return <>
        <FilePond allowMultiple={false} server={server} instantUpload={false}
            ref={pond} onaddfile={onAddFile} onremovefile={onAddFile}
            fileRenameFunction={fileRenameFunction} />
    </>
}

export default Upload;