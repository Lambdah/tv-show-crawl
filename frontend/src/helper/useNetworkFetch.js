import { useEffect, useState} from 'react';
import axios from 'axios';

export default function useNetworkFetch(network, pageNumber, pageSize){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [shows, setShows] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        axios.get(`http://localhost:8018/networks/tv/pagination/${network}`, {
            params: {
                page: pageNumber,
                size: pageSize
            }
        }).then((res) => {
            const {data} = res;
            setShows(prevShows => {
                return [...prevShows, ...data]
            });
            setHasMore(data.length > 0);
            setTimeout(() => setLoading(false), 1000);
        }).catch(e => {
            setError(true);
        })
    }, [network, pageNumber, pageSize]);
    return {loading, error, shows, hasMore}
}