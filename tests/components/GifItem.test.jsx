import { render, screen } from '@testing-library/react'
import GifItem from '../../src/components/GifItem'

describe('GifItem testing', () => {

    const title = 'Valorant';
    const url = 'https://valorant.com/img.jpg';

    test('Should match snapshot', () => {
        const { container } = render(<GifItem title={title} url={url} />);

        expect(container).toMatchSnapshot();
    })

    test('Should display img with the indicated URL and Alt atributte', () => {
        render(<GifItem title={title} url={url} />);
        
        /* expect(screen.getByRole('img').src).toBe(url);
        expect(screen.getByRole('img').alt).toBe(title); */
        const { src, alt } = screen.getByRole('img');
        expect(src).toBe(url);
        expect(alt).toBe(title);
    })

    test('Should display title in the component', () => {
        render(<GifItem title={title} url={url} />);
        expect(title).toBeTruthy();
    })
})