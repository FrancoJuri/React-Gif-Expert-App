import PropTypes from 'prop-types';

const Pagination = ({ onPreviousPage, onNextPage, page, pagination }) => {

    const totalCount = pagination.current.total_count;

    let totalPages;
    if(totalCount % 10 === 0){
        totalPages = (totalCount / 10) - 1;
    } else{
        totalPages = Math.floor(totalCount / 10)
    }

    return (
        <div className='pagination'>

            {
                (page !== 0)
                &&
                <button className='pointer' onClick={onPreviousPage}>
                    <span className='icon material-symbols-outlined'>
                        navigate_before
                    </span>
                </button>
            }

            <p>{page + 1} of {totalPages + 1}</p>

            {
                (page !== totalPages)
                &&
                <button className='pointer' onClick={onNextPage}>
                    <span className='icon material-symbols-outlined'>
                        navigate_next
                    </span>
                </button>
            }

        </div>
    )
}

Pagination.propTypes = {
    onPreviousPage: PropTypes.func.isRequired,
    onNextPage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    pagination: PropTypes.object.isRequired,
}

export default Pagination;