import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'b4dda40c56msh1f48ab056ffa476p18bd93jsn06c81b6ee1df'
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url: any) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: () => createRequest('/coins')
        }),
        getCryptoDetails: builder.query({
            query: (coinId: number) => createRequest(`/coin/${coinId}`)
        }),
    })
})




export const { useGetCryptosQuery, useGetCryptoDetailsQuery } = cryptoApi;
