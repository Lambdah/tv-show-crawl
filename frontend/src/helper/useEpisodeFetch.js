import { useEffect, useState} from 'react';
import axios from 'axios';

export default function useEpisodeFetch(pageNumber){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [episodes, setEpisodes] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    useEffect(() => {
        setLoading(true);
        setError(false);
        axios.get(`http://localhost:8018/episodes/new_releases/${pageNumber}`)
            .then((res) => {
                setEpisodes(prevEpisodes => {
                    return [...prevEpisodes, ...res.data];
                });
                setHasMore(res.data.length > 0);
                setLoading(false);
                console.log(res.data);
            }).catch(err => {
                setError(err);
        });
    }, [pageNumber]);
    return {loading, error, episodes, hasMore};
}