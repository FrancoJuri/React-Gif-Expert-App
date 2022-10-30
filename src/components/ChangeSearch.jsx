import { useState } from 'react';
import PropTypes from 'prop-types';

const ChangeSearch = ({ onChangeSearch }) => {

    const [inputValue, setInputValue] = useState('');

    const onInputChange = ({ target }) => {
        setInputValue(target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const newInputValue = inputValue.trim();
        
        if(newInputValue.length === 0){
            return;
        }

        onChangeSearch(newInputValue);
        setInputValue('');
    }

    return (
        <form className='search-form' onSubmit={onSubmit}>
            <input 
                type='text' 
                placeholder='Search for Gifs'  
                value={inputValue}
                onChange={onInputChange}
            />
            <button className='material-symbols-outlined pointer' type='submit'>
                search
            </button>
        </form>
    )
}

ChangeSearch.propTypes = {
    onChangeSearch: PropTypes.func.isRequired,
}

export default ChangeSearch;