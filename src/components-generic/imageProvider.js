import { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';

export const useImage = (url) => {
    const [safeUrl, setSafeUrl] = useState(null);

    useEffect(() => {
        const getImage = async () => {
            const [userId, filename] = url.split('/');
            try {
                const result = await Storage.get(filename, {
                    level: 'protected',
                    identityId: userId
                });
                setSafeUrl(result);
            } catch (error) {
                console.log({ error });
            }
        }
        if (url) getImage();
    }, [url]);

    return safeUrl;
}