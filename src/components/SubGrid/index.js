import axios from "axios";
import React, { useEffect, useState } from "react";
import { LIMIT_MAX } from "../constants";
import NavButtons from "../NavButtons";
import SubGridItem from "../SubGridItem";
import { readFromCache, writeToCache } from "../utils/cache";

const SubGrid = ({ uri }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);
    const [prevCount, setPrevCount] = useState(0);

    const handleData = (res) => {
        const data = res.data.data;
        const total = data.total;
        const results = data.results;
        const count = data.count;
        setData(results);
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
                handleData(res);
                cacheResponse && writeToCache(uri, res);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    };

    const getCacheData = (key) => readFromCache(key);

    const fetchData = (uri, cacheResponse = false) => {
        if (getCacheData(uri) !== null) {
            cacheResponse = true;
            handleData(readFromCache(uri));
            setLoading(false);
        } else {
            getFreshData(uri, true);
        }
    };

    useEffect(() => {
        fetchData(`${uri}&offset=${offset}`);
    }, [offset]);

    if (error)
        return <p className="centered">There was an error retrieving data</p>;
    if (loading) return <p className="loading-text">Loading...</p>;
    if (data)
        return (
            <>
                {count === 0 ? (
                    <p className="centered">No more Items</p>
                ) : (
                    <div className="sub-grid">
                        {data.map((item) => (
                            <SubGridItem key={item.id} data={item} />
                        ))}
                    </div>
                )}
                {total !== count ? (
                    <NavButtons next={next} previous={prev} offset={offset} />
                ) : (
                    <></>
                )}
            </>
        );
};

export default SubGrid;
