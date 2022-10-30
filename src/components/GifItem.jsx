import PropTypes from 'prop-types';

const GifItem = ({ title, url }) => {
    return (
        <div className='card'>
            <a href={url} target='_blank'>
                <img src={url} alt={title} />
            </a>
            <p>{ title }</p>
        </div>
    )
}

GifItem.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
}

export default GifItem;