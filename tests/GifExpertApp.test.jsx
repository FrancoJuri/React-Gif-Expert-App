import { render, screen, fireEvent } from '@testing-library/react'
import GifExpertApp from '../src/GifExpertApp'

window.scrollTo = jest.fn();

describe('GifExpertApp testing', () => {

    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })) 
        })
    })

    afterAll(() => {
        jest.clearAllMocks();
    });

    test('Should open modalHistory when clicking historyButton', () => {

        render(<GifExpertApp />);

        const historyBtn = screen.getByLabelText('historyButton');
        fireEvent.click(historyBtn);

        expect(screen.getByTestId('modal')).toBeTruthy();
    })

    test('Should change the search and put it on the top of the history when calling onChangeSearch',() => {
        const inputValue = 'Valorant'

        render(<GifExpertApp />);
        
        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');
        fireEvent.input(input,{
            target: {
                value: inputValue
            }
        });
        fireEvent.submit(form);


        const historyBtn = screen.getByLabelText('historyButton');
        fireEvent.click(historyBtn);
        const historyItemsContainer = screen.getByTestId('historyItemsContainer');
        const searchTitle = screen.getByTestId('searchTitle');

        expect(historyItemsContainer.firstChild.firstChild.textContent).toBe(inputValue);
        expect(searchTitle.textContent).toBe(inputValue);
    })

    test('Should put the search on the top of the history if it is already added', () => {
        const inputValue = 'Valorant';

        render(<GifExpertApp />);

        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');
        fireEvent.input(input,{
            target: {
                value: inputValue
            }
        });
        fireEvent.submit(form);

        // the default History Value is ['Gif'];
        const defaultHistoryValue = 'Gif';
        fireEvent.input(input,{
            target: {
                value: defaultHistoryValue,
            }
        });
        fireEvent.submit(form);

        const historyBtn = screen.getByLabelText('historyButton');
        fireEvent.click(historyBtn);
        const historyItemsContainer = screen.getByTestId('historyItemsContainer');

        expect(historyItemsContainer.firstChild.firstChild.textContent).toBe(defaultHistoryValue);
    })

    test('Should NOT add a repeated search in the history', () => {
        const inputValue = 'Valorant';

        render(<GifExpertApp />);

        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');

        // Add two searchs with the same value
        for(let i = 0; i < 2; i++){
            fireEvent.input(input,{
                target: {
                    value: inputValue
                }
            });
            fireEvent.submit(form);
        }

        const historyBtn = screen.getByLabelText('historyButton');

        fireEvent.click(historyBtn);
        const items = screen.getAllByRole('listitem');
        const filteredItems = items.filter(el => el.firstChild.textContent === 'Valorant');

        // Expect there is just one search in the history with the value that was twice added
        
        expect(filteredItems.length).toBe(1);
    })

    test('Should delete a history item', () => {
        const inputValue = 'Valorant';

        render(<GifExpertApp />);

        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');
        fireEvent.input(input,{
            target: {
                value: inputValue
            }
        });
        fireEvent.submit(form);

        const historyBtn = screen.getByLabelText('historyButton');
        fireEvent.click(historyBtn);

        const deleteItem = screen.getAllByLabelText('deleteItem');
        
        // Delete 'Valorant' search
        fireEvent.click(deleteItem[0]);

        const historyItemsContainer = screen.getByTestId('historyItemsContainer');

        expect(historyItemsContainer.firstChild.firstChild.textContent).not.toBe(inputValue);
        
    })

    test('Should delete all history', () => {
        const inputValue = 'Valorant';

        render(<GifExpertApp />);

        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');
        fireEvent.input(input, {
            target: {
                value: inputValue,
            }
        })
        fireEvent.submit(form);

        const historyBtn = screen.getByLabelText('historyButton');
        fireEvent.click(historyBtn);

        const deleteAllHistoryBtn = screen.getByText('Delete All');
        fireEvent.click(deleteAllHistoryBtn);

        const historyItemsContainer = screen.getByTestId('historyItemsContainer');

        expect(historyItemsContainer.firstChild).toBeFalsy();
    })

})