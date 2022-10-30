
export const getGifs = async (search, page) => {

    const offset = page * 10;

    const url = `https://api.giphy.com/v1/gifs/search?api_key=GUjw9TWu8yF0rkq3abpEh05IQvPDD4Jp&q=${search}&offset=${offset}&limit=10`;
    const response = await fetch(url);
    const { data, pagination } = await response.json();
    
    const gifs = data.map(gif => ({
        id: gif.id,
        title: gif.title,
        url: gif.images.downsized_medium.url
    }))

    return { gifs, pagination };
}