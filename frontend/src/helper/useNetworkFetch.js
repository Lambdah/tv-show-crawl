import { useEffect, useState} from 'react';
import axios from 'axios';

export default function useNetworkFetch(network, pageNumber, pageSize){

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [shows, setShows] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        let cancel;
        setLoading(true);
        setError(false);
        axios.get(`${process.env.REACT_APP_SERVER}/networks/tv/pagination/${network}`, {
            params: {
                page: pageNumber,
                size: pageSize
            },
            cancelToken: new axios.CancelToken((c) => cancel = c)
        }).then((res) => {
            const {data} = res;
            setShows(prevShows => {
                return [...prevShows, ...data]
            });
            setHasMore(data.length > 0);
            setLoading(false);
        }).catch(e => {
            cancel();
            if (axios.isCancel(e)){
                return;
            }
            setError(true);
        })
    }, [network, pageNumber, pageSize]);
    return {loading, error, shows, hasMore}
}