import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import Comic from "../Comic";
import {
    API_KEY,
    FORMAT_COMIC,
    LIMIT,
    ORDER_BY_ISSUE_NUMBER,
    ORDER_BY_ON_SALE_DATE,
} from "../constants";
import Grid from "../Grid";
import { readFromCache, writeToCache } from "../utils/cache";
import ScrollToTopOnMount from "../utils/ScrollToTopOnMount";

const ComicGrid = ({ collectionURI }) => {
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);

    const handleComics = (res) => {
        console.log(res);
        const data = res.data.data;
        const total = data.total;
        const results = data.results;
        setComics(results);
        setTotal(total);
    };

    const next = () => {
        setOffset(offset + LIMIT + 50);
        window.scrollTo({
            top: window.innerHeight * 0.4,
            left: window.innerWidth * 0.4,
            behavior: "smooth",
        });
    };

    const prev = () => {
        setOffset(offset - LIMIT - 50);
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
                console.log({ err });
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
        const uri = `${collectionURI}?${FORMAT_COMIC}&${ORDER_BY_ON_SALE_DATE}&${API_KEY}&offset=${offset}&limit=${
            LIMIT + 50
        }`;
        fetchComics(uri);
    }, [offset]);

    if (error) return <p>There was an error loading comics</p>;
    if (loading) return <p className="loading-text">Loading...</p>;
    if (comics)
        return (
            <>
                <div className="comic-grid">
                    {comics.map((comic, key) => (
                        <Comic comic={comic} />
                    ))}
                    {/* <Grid data={comics} /> */}
                </div>
                <div className="nav-buttons">
                    {offset === 0 ? (
                        <div></div>
                    ) : (
                        <Button className="ui red large button" onClick={prev}>
                            Previous
                        </Button>
                    )}

                    <Button className="ui red large button" onClick={next}>
                        Next
                    </Button>
                </div>
            </>
        );
};

export default ComicGrid;
