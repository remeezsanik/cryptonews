import React, { useState } from 'react'
import { Select, Row, Col, Typography, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Title, Text } = Typography;
const { Option } = Select;

const News = () => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory });
    const { data } = useGetCryptosQuery(null);
    console.log("News is here:", cryptoNews);

    const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

    return (
        <>
            <Col span={24}>
                <Select showSearch
                    className='select-news' placeholder="Select a Crypto"
                    optionFilterProp='children' onChange={(value: string) => setNewsCategory(value)}
                    filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    {/* <Option value='Cryptocurrency'>Cryptocurrency</Option> */}
                    {data?.data?.coins.map((coin: any) => (
                        <Option value={coin.name}>{coin.name}</Option>
                    ))}
                </Select>
            </Col>

            <Row gutter={[24, 24]}>
                {cryptoNews?.value.map((news: any) => (
                    <Col xs={24} sm={12} lg={8}>
                        <Card hoverable className='news-card'>
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className='news-image-container'>
                                    <Title className='news-title' level={4}>
                                        {news.name}
                                    </Title>
                                    <img style={{ maxWidth: '200px', maxHeight: '100px' }}
                                        src={news?.image?.thumbnail?.contentUrl || demoImage} alt='news' />
                                </div>
                                <p>
                                    {news?.description > 50 ? `${news.description.substring(0, 50)}...`
                                        : news.description}
                                </p>
                                <div className='provider-container'>
                                    <div>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='' />
                                        <Text className='provider-name'>{news.provider[0]?.name}</Text>
                                    </div>
                                    <Text>{moment(news.datePublished).startOf('second').fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default News
