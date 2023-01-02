import { render, screen, fireEvent } from "@testing-library/react"
import { HistoryButton } from "../../src/components"


describe('HistoryButton testing', () => {

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

    test('Should match snapshot', () => {

        const { container } = render(<HistoryButton setIsModalActive={() => {}} />);

        expect(container).toMatchSnapshot();
    })

    test('Should call setIsModalActive when clicking the button', () => {
        const setIsModalActive = jest.fn();

        render(<HistoryButton setIsModalActive={setIsModalActive} />);

        const btn = screen.getByRole('button');
        fireEvent.click(btn);

        expect(setIsModalActive).toHaveBeenCalledWith(true);
    })

})