import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoNewsHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': 'b4dda40c56msh1f48ab056ffa476p18bd93jsn06c81b6ee1df'
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url: any) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory }) => createRequest(`/news/search?q=${newsCategory}`)
        })
    })
})


export const { useGetCryptoNewsQuery } = cryptoNewsApi;