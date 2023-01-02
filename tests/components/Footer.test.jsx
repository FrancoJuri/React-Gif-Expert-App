import { render } from '@testing-library/react'
import { Footer } from '../../src/components';


describe('Footer testing', () => {

    test('Should match snapshot', () => {

        const { container } = render(<Footer />);

        expect(container).toMatchSnapshot();
    })

})