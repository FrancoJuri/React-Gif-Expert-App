import { fireEvent, render, screen } from '@testing-library/react';
import ChangeSearch from '../../src/components/ChangeSearch';

describe('ChangeSearch testing', () => {

    test('Should change the input text value', () => {

        render( <ChangeSearch onChangeSearch={ () => {} } />);
        const input = screen.getByRole('textbox');

        fireEvent.input(input, {
            target: { 
                value: 'Valorant'
            }
        });

        expect(input.value).toBe('Valorant');

    })

    test('Should call onChangeSearch if the input is not empty', () => {
        const inputValue = 'Valorant';
        const onChangeSearch = jest.fn();

        render( <ChangeSearch onChangeSearch={ onChangeSearch } />);

        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');

        fireEvent.input(input, {
            target: { 
                value: inputValue
            }
        });

        fireEvent.submit(form);

        expect(input.value).toBe('');

        expect(onChangeSearch).toHaveBeenCalledTimes(1);
        expect(onChangeSearch).toHaveBeenCalledWith(inputValue.trim());
    })

    test('Should not call onChangeSearch if the input is empty', () => {
        const onChangeSearch = jest.fn();

        render( <ChangeSearch onChangeSearch={ onChangeSearch } />);

        const form = screen.getByRole('form');

        fireEvent.submit(form);

        expect(onChangeSearch).not.toHaveBeenCalled();
    })
})