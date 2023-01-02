import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../../src/components';

describe('Pagination testing', () => {

    const pagination = {
        current: {
            total_count: 34,
        }
    }

    test('Should display next page button if page !== totalPages', () => {

        const page = 0;

        render(<Pagination onPreviousPage={() => {}} onNextPage={() => {}} page={page} pagination={pagination} />)

        expect(screen.getByText('navigate_next')).toBeTruthy();

    })

    test('Should display previous page button if page !== 0', () => {

        const page = 1;

        render(<Pagination onPreviousPage={() => {}} onNextPage={() => {}} page={page} pagination={pagination} />)

        expect(screen.getByText('navigate_before')).toBeTruthy();

    })

    test('Should display a paragraph which contains the page number + 1 of total pages + 1', () => {
        const page = 0;

        render(<Pagination onPreviousPage={() => {}} onNextPage={() => {}} page={page} pagination={pagination} />)

        const totalCount = pagination.current.total_count;

        let totalPages;
        if(totalCount % 10 === 0){
            totalPages = (totalCount / 10) - 1;
        } else{
            totalPages = Math.floor(totalCount / 10)
        }

        expect(screen.getByText(`${page + 1} of ${totalPages + 1}`)).toBeTruthy();
    })

    test('Should call onPreviousPage when clicking the previous page button', () => {
        const page = 1;
        const onPreviousPage = jest.fn();

        render(<Pagination onPreviousPage={onPreviousPage} onNextPage={() => {}} page={page} pagination={pagination} />)

        const previousPageButton = screen.getByLabelText('previousButton');

        fireEvent.click(previousPageButton);

        expect(onPreviousPage).toHaveBeenCalled();
    })

    test('Should call onNextPage when clicking the next page button', () => {
        const page = 0;
        const onNextPage = jest.fn();

        render(<Pagination onPreviousPage={() => {}} onNextPage={onNextPage} page={page} pagination={pagination} />)

        const nextPageButton = screen.getByLabelText('nextButton');

        fireEvent.click(nextPageButton);

        expect(onNextPage).toHaveBeenCalled();
    })

})