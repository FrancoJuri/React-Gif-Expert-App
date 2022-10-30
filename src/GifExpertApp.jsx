import { useEffect, useState } from 'react';
import { ChangeSearch, GifGrid, HistoryButton, HistoryModal } from './components';

let initialHistory;

if(JSON.parse(localStorage.getItem('history')) === null || !JSON.parse(localStorage.getItem('history')).length){
  initialHistory = ['Gif'];
} else{
  initialHistory = JSON.parse(localStorage.getItem('history'));
}

const initialSearch = initialHistory[0];

const GifExpertApp = () => {

  const [search, setSearch] = useState(initialSearch);
  const [history, setHistory] = useState(initialHistory);
  
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history])

  useEffect(() => {
    if(!isModalActive) {
      document.querySelector('body').style.overflowY = 'scroll';
    } else{
      document.querySelector('body').style.overflow = 'hidden';
    }
  }, [isModalActive])

  const onChangeSearch = (newSearch) => {
    setSearch(newSearch);

    if(history.some(el => el === newSearch)) {
      const filteredHistory = history.filter(el => el !== newSearch)
      setHistory([newSearch, ...filteredHistory]);
      return;
    }

    setHistory(h => [newSearch, ...h]);
  }

  const onDeleteHistoryItem = (item) => {
    const filteredHistory = history.filter(el => el !== item);
    setHistory(filteredHistory);
  } 

  const onDeleteAllHistory = () => setHistory([]);

  return (
    <>
      <header className='heading-container'>
        <h1 className='text-center'>Gif Expert App</h1>
        <ChangeSearch onChangeSearch={ onChangeSearch } />
      </header>

      <HistoryButton setIsModalActive={setIsModalActive} />
      
      {
        (isModalActive)
        &&
        <HistoryModal 
          history={history} 
          onDeleteHistoryItem={onDeleteHistoryItem}
          onDeleteAllHistory={onDeleteAllHistory}
          onChangeSearch={onChangeSearch}
          setIsModalActive={setIsModalActive}
        />
      }

      <GifGrid search={search} />

    </>
  )
}

export default GifExpertApp;