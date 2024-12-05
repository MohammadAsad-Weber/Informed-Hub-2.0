import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'; // Infinite Scroll
import LoadingBar from 'react-top-loading-bar'; // Top Loading Bar

// Components
import NewsItem from './NewsItem';
import Spinner from './Spinner';

function NewsArea({ category, apiKey }) {

    const [articles, setArticles] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(10);
    const [isError, setIsError] = useState(false);

    const capitalise = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    document.title = `Informed Hub - ${capitalise(category)}`;

    const updateNews = async () => {
        try {
            setIsError(false);

            const url = `https://newsapi.org/v2/top-headlines?language=en&category=${category}&page=${page}&pageSize=12&apiKey=${apiKey}`;
            const response = await fetch(url);

            setProgress(30)
            const data = await response.json();
            setProgress(60)

            setArticles(data.articles)
            setTotalResults(data.totalResults)
            setLoading(false)
            setProgress(100)

        } catch (error) {
            setTimeout(() => {
                setLoading(false)
                setProgress(100)
                setIsError(true)
            }, 5000)
        }
    }

    useEffect(() => {
        updateNews()
    }, [])

    const fetchMoreData = async () => {
        const nextPage = page + 1;
        const url = `https://newsapi.org/v2/top-headlines?language=en&category=${category}&page=${nextPage}&pageSize=12&apiKey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        setArticles(articles.concat(data.articles))
        setTotalResults(data.totalResults)
        setPage(nextPage)
    }

    return (
        <>
            <LoadingBar
                height={2}
                shadow={true}
                color='blue'
                progress={progress}
            />
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div id='newsArea'>
                    {isError && <h3 id='error'>Some error occured. Please try again later!</h3>}
                    {articles.length !== 0 && articles.map((element, index) => {
                        return <NewsItem key={index}
                            img={element.urlToImage}
                            headline={element.title ? element.title : 'Breaking News'}
                            description={element.description ? element.description : 'Some Description Here...'}
                            url={element.url}
                            date={element.publishedAt}
                            source={element.source.name}
                        />
                    })}
                </div>
            </InfiniteScroll>
        </>
    )
}

export default NewsArea
