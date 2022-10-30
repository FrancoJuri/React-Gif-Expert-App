import PropTypes from 'prop-types';

const HistoryModal = ({ history, onChangeSearch, onDeleteHistoryItem, onDeleteAllHistory, setIsModalActive }) => {
    return (
        <div className='modal'>
            <div className='modal-container'>

                <div className="modal-header">
                    <h3 className='modal-title'> 
                        <span className="material-symbols-outlined">history</span> 
                        History 
                    </h3>
                </div>

                <hr />

                <div className='modal-body'>
                    <ul className='history-list styled-scrollbar'>
                        <div>
                            {
                                history.map(item => (
                                    <li className='history-item pointer' key={item} onClick={(e) => {
                                        e.stopPropagation();
                                        onChangeSearch(item);
                                        setIsModalActive(false);
                                    }}>
                                        {item}
                                        <span className='material-symbols-outlined pointer' onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteHistoryItem(item);
                                        }}>
                                            delete
                                        </span>
                                    </li>
                                ))
                            }
                        </div>

                        {
                            (history.length >= 2)
                            &&
                            <button className="remove-history pointer" onClick={onDeleteAllHistory}>
                                Delete All
                            </button>
                        }

                        {
                            (!history.length)
                            &&
                            <p className='text-center'>Your history is empty</p>
                        }
                    </ul>
                </div>

                <hr />

                <div className="modal-footer">
                    <button className='modal-close pointer' onClick={() => {
                        setIsModalActive(false);
                    }}>Close</button>
                </div>

            </div>
        </div>
    )
}

HistoryModal.propTypes = {
    history: PropTypes.array.isRequired,
    onChangeSearch: PropTypes.func.isRequired,
    onDeleteHistoryItem: PropTypes.func.isRequired,
    onDeleteAllHistory: PropTypes.func.isRequired,
    setIsModalActive: PropTypes.func.isRequired,
}

export default HistoryModal;