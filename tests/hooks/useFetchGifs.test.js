import { renderHook, waitFor } from "@testing-library/react"
import { useFetchGifs } from "../../src/hooks/useFetchGifs"

window.scrollTo = jest.fn();

describe('useFetchGifs hook testing', () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    test('Should return initial state', () => {
        
        const { result } = renderHook(() => useFetchGifs('Valorant'));
        const { gifs, isLoading, page, pagination } = result.current;
        
        expect(gifs.length).toBe(0);
        expect(isLoading).toBeTruthy();
        expect(page).toBe(0);
        expect(pagination.current).toBeNull();
    })

    test('Should return a gifs array and isLoading as false', async () => {
        
        const { result } = renderHook(() => useFetchGifs('Valorant'));

        await waitFor( 
            () => expect(result.current.isLoading).toBeFalsy(),
        );

        const { gifs, isLoading, page, pagination } = result.current;
        
        expect(gifs.length).toBeGreaterThan(0);
        expect(isLoading).toBe(false);
        expect(page).toBe(0);
        expect(pagination.current).toBeTruthy();
    })

})