import React, { useEffect, useState } from 'react'
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi';


const Cryptocurrencies: React.FC = () => {
    // const count = simplified ? 10 : 100;
    const { data: cryptoList } = useGetCryptosQuery(null);
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filteredData = cryptoList?.data?.coins.filter(
            (coin: any) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

        setCryptos(filteredData);

    }, [cryptoList, searchTerm])

    console.log("here is crypto data", cryptos);

    return (
        <>
            <div className='search-crypto'>
                <Input placeholder='Search Crypto' onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <Row gutter={[32, 32]} className='crypto-card-container'>
                {cryptos?.map((coin: any) => (
                    <Col xs={24} sm={12} lg={6} className='crypto-card' key={coin.id}>
                        <Link key={coin.id} to={`/crypto/${coin.id}`}>
                            <Card
                                title={`${coin.rank}. ${coin.name}`}
                                extra={<img className='crypto-image' src={coin.iconUrl} />}
                                hoverable>
                                <p>Price: {millify(coin.price)}</p>
                                <p>Market Cap: {millify(coin.marketCap)}</p>
                                <p>Daily Change: {millify(coin.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}

            </Row>
        </>
    )
}

export default Cryptocurrencies
