import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    API_KEY,
    FORMAT_COMIC,
    LIMIT,
    ORDER_BY_ISSUE_NUMBER,
    ORDER_BY_ON_SALE_DATE,
} from "../constants";
import Grid from "../Grid";

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
        setOffset(offset + LIMIT);
    };

    const prev = () => {
        setOffset(offset - LIMIT);
    };

    const fetchComics = (uri) => {
        setLoading(true);
        axios
            .get(
                `${collectionURI}?${FORMAT_COMIC}&${ORDER_BY_ON_SALE_DATE}&${API_KEY}&offset=${offset}&limit=${LIMIT}`,
            )
            .then((res) => {
                handleComics(res);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
            });
    };

    useEffect(() => {
        fetchComics(collectionURI);
    }, [offset]);

    if (error) return <p>There was an error loading comics</p>;
    if (loading) return <p className="loading-text">Loading...</p>;
    if (comics)
        return (
            <>
                {comics.map((comic, key) => (
                    <div className="ui">
                        <figure className="grid-figure">
                            <div className="grid-photo-wrap">
                                <img
                                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                    alt={comic.title}
                                    className="grid-photo"
                                />
                            </div>

                            <figcaption>
                                <p className="character-name">{comic.title}</p>
                            </figcaption>
                        </figure>
                    </div>
                ))}
                {/* <Grid data={comics} /> */}
                <button onClick={prev}>Prev</button>
                <button onClick={next}>Next</button>
            </>
        );
};

export default ComicGrid;
