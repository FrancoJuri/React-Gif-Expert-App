import { render, screen } from '@testing-library/react';
import { GifGrid } from '../../src/components';
import { useFetchGifs } from '../../src/hooks/useFetchGifs';

jest.mock('../../src/hooks/useFetchGifs')

describe('<GifGrid /> testing', () => {

    const search = 'Valorant'; 

    test('Should firstly display loading', () => {

        useFetchGifs.mockReturnValue({
            gifs: [],
            isLoading: true,
            setPage: expect.any(Function),
            page: 0,
            pagination: expect.any(Object),
        })

        render(<GifGrid search={search} />);
        
        expect(screen.getByText('Loading...')).toBeTruthy();
        expect(screen.getByText(search)).toBeTruthy();
    })

    test('Should display items, Pagination and Footer when gifs are loaded from useFetchGifs', () => {

        const gifs = [
            {
                id: 'ABC',
                title: 'sage',
                url: 'https://localhost/sage.jpg',
            },
            {
                id: '123',
                title: 'phoenix',
                url: 'https://localhost/phoenix.jpg',
            }
        ]

        useFetchGifs.mockReturnValue({
            gifs,
            isLoading: false,
            setPage: expect.any(Function),
            page: 0,
            pagination: {
                current: {
                    total_count: 1553,
                }
            }
        })

        const { container } = render(<GifGrid search={search} />);

        expect(screen.getAllByRole('img').length).toBe(2);
        expect(screen.getByRole('contentinfo')).toBeTruthy();
        expect(container.querySelector('.pagination')).toBeTruthy();
    })

    test('Should display "No Gifs Found" message when gifs is an empty array and isLoading is false', () => {
        const gifs = [];
        useFetchGifs.mockReturnValue({
            gifs,
            isLoading: false,
            setPage: expect.any(Function),
            page: 0,
            pagination: expect.any(Object),
        })

        render(<GifGrid search={search} />);

        expect(screen.getByText('No Gifs Found')).toBeTruthy();
    })

})