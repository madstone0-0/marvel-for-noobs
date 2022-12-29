import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import {
    API_KEY,
    FORMAT_COMIC,
    LIMIT_MAX,
    ORDER_BY_ISSUE_NUMBER,
    ORDER_BY_ON_SALE_DATE,
} from "../constants";
import NavButtons from "../NavButtons";
import SubGridItem from "../SubGridItem";
import { readFromCache, writeToCache } from "../utils/cache";
import ScrollToTopOnMount from "../utils/ScrollToTopOnMount";

const ComicGrid = ({ collectionURI }) => {
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);
    const [prevCount, setPrevCount] = useState(0);

    const handleComics = (res) => {
        const data = res.data.data;
        const total = data.total;
        const results = data.results;
        const count = data.count;
        setComics(results);
        setTotal(total);
        setCount(count);
    };

    const next = () => {
        const currOffset =
            count < LIMIT_MAX ? offset + count : offset + LIMIT_MAX;
        setPrevCount(count);
        setOffset(currOffset);
        window.scrollTo({
            top: window.innerHeight * 0.4,
            left: window.innerWidth * 0.4,
            behavior: "smooth",
        });
    };

    const prev = () => {
        const currOffset =
            prevCount < LIMIT_MAX ? offset - prevCount : offset - LIMIT_MAX;
        setOffset(currOffset);
        window.scrollTo({
            top: window.innerHeight * 0.4,
            left: window.innerWidth * 0.4,
            behavior: "smooth",
        });
    };

    const getFreshData = (uri, cacheResponse) => {
        setLoading(true);
        axios
            .get(uri)
            .then((res) => {
                handleComics(res);
                cacheResponse && writeToCache(uri, res);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    };

    const getCacheData = (key) => readFromCache(key);

    const fetchComics = (uri, cacheResponse = false) => {
        if (getCacheData(uri) !== null) {
            cacheResponse = true;
            handleComics(readFromCache(uri));
            setLoading(false);
        } else {
            getFreshData(uri, true);
        }
    };

    useEffect(() => {
        const uri = `${collectionURI}?${FORMAT_COMIC}&${ORDER_BY_ON_SALE_DATE}&${API_KEY}&offset=${offset}&limit=${LIMIT_MAX}`;
        fetchComics(uri);
    }, [offset]);

    if (error) return <p>There was an error loading comics</p>;
    if (loading) return <p className="loading-text">Loading...</p>;
    if (comics)
        return (
            <>
                {count === 0 ? (
                    <p className="centered">No more comics</p>
                ) : (
                    <div className="comic-grid">
                        {comics.map((comic, key) => (
                            <SubGridItem key={comic.id} data={comic} />
                        ))}
                    </div>
                )}
                <NavButtons next={next} previous={prev} offset={offset} />
            </>
        );
};

export default ComicGrid;
