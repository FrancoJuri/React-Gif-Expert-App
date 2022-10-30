import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const HistoryButton = ({ setIsModalActive }) => {

  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const checkFooter = () => {
    document.addEventListener('scroll', () => {

      if(!document.querySelector('footer')) return;

      const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        setIsFooterVisible(entry.isIntersecting);
      })

      observer.observe(document.querySelector('footer'));
    })
  }

  useEffect(() => {

    if(!window.matchMedia('(max-width: 680px)').matches){
      return;
    }

    checkFooter();

    return () => {
      document.removeEventListener('scroll', checkFooter);
    }
    
  }, []) 

  let component;

  if(isFooterVisible){
    component = null;
  } else{
    component = <button className='history-button pointer' onClick={() => {
      setIsModalActive(true);
    }}>
        <span className='material-symbols-outlined'>history</span>
        <span className='history-button-text'>History</span>
    </button>;
  }

  return (component)
}

HistoryButton.propTypes = {
  setIsModalActive: PropTypes.func.isRequired,
}

export default HistoryButton;