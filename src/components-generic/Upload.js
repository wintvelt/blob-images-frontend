import React, { useState, useRef } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import { Storage } from "aws-amplify";
import { Button } from '@material-ui/core';

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

const Upload = (props) => {
    const [file, setFile] = useState('');
    const pond = useRef(null);
    const onClick = async (e) => {
        const myFile = await Storage.put('text.txt', 'Hello protected', {
            level: 'protected',
            contentType: 'text/plain'
        });
        // const myFile = await Storage.get('mobly team.jpeg', { 
        //     level: 'protected'
        // });
        console.log(myFile);
        // setFile(myFile);
    }
    const onChange = (e) => {
        const file = e.target.files[0];
        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (e) {
            setFile(e.target.result)
        })

        // Read in the image file as a data URL.
        reader.readAsDataURL(file);
    }

    return <>
        <FilePond allowMultiple={false} server={server} instantUpload={false} ref={pond} />
        <Button variant='contained' color='secondary'
            onClick={() => pond.current.processFiles().then(files => console.log('hoera'))}>
            GO!
        </Button>
        <img src={file} width='100%' />
        <input type='file' onChange={onChange} />
        <pre style={{ color: 'white' }}>{file}</pre>
        <Button variant='contained' color='secondary' onClick={onClick}>Load a file from S3</Button>
    </>
}

export default Upload;