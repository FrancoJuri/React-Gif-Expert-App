import { useEffect, useRef, useState } from 'react';
import { getGifs } from '../helpers/getGifs';

const initialPage = 0;

export const useFetchGifs = (search) => {

    const [gifs, setGifs] = useState([]);
    const [page, setPage] = useState(initialPage);
    const [isLoading, setIsLoading] = useState(true);
    const pagination = useRef(null);

    const getImages = async (pageNumber) => {
        setIsLoading(true)
        const data = await getGifs(search, pageNumber);
        setGifs(data.gifs);
        pagination.current = data.pagination;
        setIsLoading(false);
    }

    useEffect( () => {
        setPage(initialPage);
        getImages(initialPage);
        window.scrollTo(0, 0);
    }, [search]);

    useEffect(() => {
        if(page === initialPage && isLoading) return;
        getImages(page);
        window.scrollTo(0, 0);
    }, [page])

    return {
        gifs,
        isLoading,
        setPage,
        page,
        pagination
    }
    
}