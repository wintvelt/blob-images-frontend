import React from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import { Auth } from "aws-amplify";

const Upload = (props) => {
    return <FilePond allowMultiple={false} server='https://blob-images.s3.eu-central-1.amazonaws.com'/>
}

export default Upload;