import { render, screen, fireEvent } from '@testing-library/react';
import HistoryModal from '../../src/components/HistoryModal';


describe('HistoryModal testing', () => {

    test('Should display the values of History if it has at least a value', () => {
        const history = ['Gif'];
        render(
            <HistoryModal 
                history={history} 
                onChangeSearch={() => {}}  
                onDeleteHistoryItem={() => {}}
                onDeleteAllHistory={() => {}}
                setIsModalActive={() => {}}
            />
        );

        expect(screen.getByText(history[0])).toBeTruthy();
    })

    test('Should call setIsModalActive when clicking the modal close button', () => {
        const history = ['Gif'];
        const setIsModalActive = jest.fn();

        render(
            <HistoryModal 
                history={history} 
                onChangeSearch={() => {}}  
                onDeleteHistoryItem={() => {}}
                onDeleteAllHistory={() => {}}
                setIsModalActive={setIsModalActive}
            />
        );
        
        const btnClose = screen.getByLabelText('closeButton');
        fireEvent.click(btnClose);

        expect(setIsModalActive).toHaveBeenCalledWith(false);
    })

    test('Should not display deleteAll button if history.length < 2', () => {
        const history = ['Gif'];
        render(
            <HistoryModal 
                history={history} 
                onChangeSearch={() => {}}  
                onDeleteHistoryItem={() => {}}
                onDeleteAllHistory={() => {}}
                setIsModalActive={() => {}}
            />
        );

        const deleteAllBtn = screen.queryByText('Delete All');

        expect(deleteAllBtn).toBeFalsy();
    })

    test('Should call onDeleteAllHistory when clicking deleteAll button', () => {
        const history = ['Gif', 'Hola'];
        const onDeleteAllHistory = jest.fn();
        render(
            <HistoryModal 
                history={history} 
                onChangeSearch={() => {}}  
                onDeleteHistoryItem={() => {}}
                onDeleteAllHistory={onDeleteAllHistory}
                setIsModalActive={() => {}}
            />
        );

        const deleteAllBtn = screen.getByText('Delete All');

        fireEvent.click(deleteAllBtn);

        expect(onDeleteAllHistory).toHaveBeenCalled();
    })

    test('Should display a message when history is empty', () => {
        const history = [];
        const msg = 'Your history is empty';
        render(
            <HistoryModal 
                history={history} 
                onChangeSearch={() => {}}  
                onDeleteHistoryItem={() => {}}
                onDeleteAllHistory={() => {}}
                setIsModalActive={() => {}}
            />
        );

        expect(screen.getByText(msg)).toBeTruthy();
    })

    test('Should call onChangeSearch and setIsModalActive when clicking <li class="history-item">...</li>', () => {
        const history = ['Gif'];
        const onChangeSearch = jest.fn();
        const setIsModalActive = jest.fn();
        render(
            <HistoryModal 
                history={history} 
                onChangeSearch={onChangeSearch}  
                onDeleteHistoryItem={() => {}}
                onDeleteAllHistory={() => {}}
                setIsModalActive={setIsModalActive}
            />
        );

        const historyItem = screen.getByLabelText('historyItem');

        fireEvent.click(historyItem);

        expect(onChangeSearch).toHaveBeenCalledWith(historyItem.firstChild.textContent);
        expect(setIsModalActive).toHaveBeenCalledWith(false);
    })

    test('Should call onDeleteHistoryItem when clicking deleteItem span and should not call onChangeSearch or setIsModalActive', () => {
        const history = ['Gif'];
        const onChangeSearch = jest.fn();
        const setIsModalActive = jest.fn();
        const onDeleteHistoryItem = jest.fn();
        render(
            <HistoryModal 
                history={history} 
                onChangeSearch={onChangeSearch}  
                onDeleteHistoryItem={onDeleteHistoryItem}
                onDeleteAllHistory={() => {}}
                setIsModalActive={setIsModalActive}
            />
        );

        const deleteItem = screen.getByLabelText('deleteItem');

        fireEvent.click(deleteItem);

        expect(onDeleteHistoryItem).toHaveBeenCalledWith(deleteItem.previousSibling.textContent);
        expect(setIsModalActive).not.toHaveBeenCalled();
        expect(onChangeSearch).not.toHaveBeenCalled();
    })

})