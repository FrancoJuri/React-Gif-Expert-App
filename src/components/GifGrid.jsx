import { useFetchGifs } from '../hooks/useFetchGifs';
import { GifItem, Pagination, Footer } from './';
import PropTypes from 'prop-types';

const GifGrid = ({ search }) => {

    const { gifs, isLoading, page, setPage, pagination } = useFetchGifs(search);

    const onPreviousPage = () => {
        setPage(page - 1);
    }

    const onNextPage = () => {
        setPage(page + 1);
    }

    return (
        <>
            
            <h2 className='search-title text-center' data-testid='searchTitle'>{search}</h2>

            {
                isLoading && <h2 className='text-center'>Loading...</h2>
            }

            <div className='card-grid'>
                {
                    gifs.map((gif) => (
                        <GifItem 
                            key={ gif.id } 
                            {...gif}
                        />
                    ))
                }

                {
                    (!gifs.length && !isLoading)
                    &&
                    <div className='no-gifs'>
                        <h2 className='text-center'>No Gifs Found</h2>
                    </div>
                }
            </div>
            

            {
                (!isLoading && gifs.length >= 1)
                &&
                <>
                    <Pagination 
                        onPreviousPage={onPreviousPage}
                        onNextPage={onNextPage}
                        page={page}
                        pagination={pagination}
                    />
                    <Footer />
                </>
            }

        </>
    )
}

GifGrid.propTypes = {
    search: PropTypes.string.isRequired,
}

export default GifGrid;