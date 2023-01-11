import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import NavButtons from "../NavButtons";
import Search from "../Search";
import SubGridItem from "../SubGridItem";
import { HASH, LIMIT_MAX, TIMESTAMP } from "../constants";
import { readFromCache, writeToCache } from "../utils/cache";

const SubGrid = ({ uri, hasSearchBar = false, searchPlaceholder = "" }) => {
    const [data, setData] = useState([]);
    const [displayedData, setDisplayedData] = useState([]);
    const [searchData, setSearchData] = useState("");
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
        setDisplayedData(results);
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
        const fullUri = `https:${uri.split(":")[1]}&offset=${offset}`;
        if (getCacheData(fullUri) !== null) {
            cacheResponse = true;
            handleData(readFromCache(fullUri));
            setLoading(false);
        } else {
            getFreshData(fullUri, true);
        }
    };

    const searchDataChange = (e) => {
        return setSearchData(e.target.value);
    };

    const searchDataSubmit = (e) => {
        e.preventDefault();
        console.log(data.length);
        const newDisplayedData = data.filter((data) =>
            data.title.includes(searchData),
        );
        // const newData = [...data, ...newDisplayedData];
        console.log({ data });
        console.log({ newDisplayedData });
        setDisplayedData(newDisplayedData);
    };

    useEffect(() => {
        fetchData(uri);
    }, [offset]);

    if (error)
        return <p className="centered">There was an error retrieving data</p>;
    if (loading) return <Loading />;
    if (data)
        return (
            <>
                {hasSearchBar ? (
                    <Search
                        value={searchData}
                        onSearchChange={searchDataChange}
                        onSearchSubmit={searchDataSubmit}
                        placeholder={searchPlaceholder}
                    />
                ) : (
                    <></>
                )}

                {count === 0 ? (
                    <p className="centered">No more Items</p>
                ) : (
                    <div className="sub-grid">
                        {displayedData.map((item) => (
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
