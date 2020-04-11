import { useEffect, useState} from 'react';
import axios from 'axios';

export default function useEpisodeFetch(pageNumber, pageSize){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [episodes, setEpisodes] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    useEffect(() => {
        setLoading(true);
        setError(false);
        axios.get(`http://localhost:8018/episodes/new_releases/page/${pageNumber}/sizes/${pageSize}`)
            .then((res) => {
                setEpisodes(prevEpisodes => {
                    return [...new Set([...prevEpisodes, ...res.data])];
                });
                setHasMore(res.data.length > 0);
                setTimeout(() => setLoading(false), 1000);
            }).catch(err => {
                setError(true);
        });
    }, [pageNumber, pageSize]);
    return {loading, error, episodes, hasMore};
}