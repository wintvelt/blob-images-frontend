import { useEffect } from 'react';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { API } from 'aws-amplify';
import { errorLog } from '../helpers/errorLog';

export const featuresData = atom({
    key: 'featuresData',
    default: { isLoading: true },
});

export const useReloadFeatures = () => {
    const setFeatures = useSetRecoilState(featuresData);
    const loadData = async () => {
        console.log(`loading features`);
        try {
            const features = await API.get('blob-images', `/features`);
            setFeatures({ contents: features });
        } catch (error) {
            errorLog(error);
            setFeatures({ hasError: error });
        }
    }
    return loadData;
};

export const useFeatures = () => {
    const features = useRecoilValue(featuresData);
    const reloadFeatures = useReloadFeatures();
    useEffect(() => {
        reloadFeatures();
    }, []);
    return features;
};

export const useFeaturesValue = () => {
    const features = useRecoilValue(featuresData);
    return features;
};

const voteSort = (a, b) => (
    (a.votes > b.votes) ? -1
        : (a.votes < b.votes) ? 1
            : 0
);

const upvoteInList = (featureList, id) => (
    featureList.map(feat => (feat.SK === id) ? { ...feat, votes: feat.votes + 1 } : feat)
        .sort(voteSort)
);

export const useFeaturesAPI = () => {
    const [features, setFeatures] = useRecoilState(featuresData);
    const featureList = features.contents || [];

    const add = async ({ title, description }) => {
        try {
            const newFeature = await API.post('blob-images', '/features', {
                body: { title, description }
            });
            setFeatures({ contents: [...featureList, newFeature] });
            return { success: true };
        } catch (error) {
            errorLog(error);
            return { error };
        }
    }

    const upvote = async ({ SK }) => {
        try {
            await API.post('blob-images', `/features/${SK}`);
            setFeatures({ contents: upvoteInList(featureList, SK) });
        } catch (error) {
            errorLog(error);
            return { error };
        }
    }

    return { add, upvote };
}