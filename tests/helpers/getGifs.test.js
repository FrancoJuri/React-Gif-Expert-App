import { getGifs } from '../../src/helpers/getGifs';

describe('getGifs testing', () => { 

    test('Should return a gifs array', async () => {
        const { gifs } = await getGifs('valorant');
        // console.log(gifs)
        expect(gifs.length).toBeGreaterThan(0);
        expect(gifs[0]).toEqual({
            id: expect.any(String),
            title: expect.any(String),
            url: expect.any(String),
        })
    })

})