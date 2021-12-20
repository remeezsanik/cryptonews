import React, { Children } from 'react'
import millify from 'millify';
import { Typography, Col, Row, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '.';

const { Title } = Typography;

const Homepage = () => {
    const { data } = useGetCryptosQuery(null);
    console.log("here is data", data);
    const globalStats = data?.data?.stats;

    return (
        <>
            {data ? (
                <>
                    <Title level={2} className='heading'>
                        Global Crypto Stats
                    </Title>
                    <Row>
                        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>
                        <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
                        <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
                        <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} /></Col>
                        <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
                    </Row>
                    <div className='home-heading-container'>
                        <Title level={2} className='home-title'>
                            Top Cryptocurrencies in the world
                        </Title>
                        <Title level={3} className='show-all'>
                            <Link to='/cryptocurrencies'>Show All</Link>
                        </Title>
                    </div>
                    <Cryptocurrencies />
                    <div className='home-heading-container'>
                        <Title level={2} className='home-title'>
                            Latest Crypto News
                        </Title>
                        <Title level={3} className='show-all'>
                            <Link to='/news'>Show All</Link>
                        </Title>
                    </div>
                    <News />
                </>
            ) : null}
        </>
    )
}

export default Homepage
