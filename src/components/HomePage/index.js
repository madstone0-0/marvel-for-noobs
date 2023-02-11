import axios from "axios";
import React, { useEffect, useState } from "react";
import CountdownCard from "../CountdownCard";

import {
    MOVIES,
    MOVIES_COLUMNS,
    MOVIES_LIMIT,
    MOVIES_ORDER,
    MOVIE_PATH_BASE,
} from "../constants";
import { readFromCache, writeToCache } from "../utils/cache";

/**
 * Responsible for home page tab
 */
const HomePage = () => {
    const [upcomingMovies, setMovies] = useState([]);
    const [isLoading, updateLoadingState] = useState(true);
    const [error, updateErrorState] = useState(null);

    const setUpcomingMovies = (data) => {
        const new_data = [];
        data.forEach((movie) => {
            const release_date = new Date(movie.release_date);
            new_data.push({
                name: movie.title,
                timeTill: `${("00" + release_date.getUTCDate()).slice(
                    -2,
                )} ${release_date.toLocaleDateString("en-US", {
                    month: "short",
                })} ${release_date.getUTCFullYear()} 00:00:00 UTC`,
                cover: movie.cover_url,
                trailer: movie.trailer_url && movie.trailer_url,
            });
        });
        const filtered_movies = new_data.filter((movie) => {
            return !(
                new Date(movie.timeTill) <
                new Date(new Date().setDate(new Date().getDate() - 100))
            );
        });
        setMovies(filtered_movies.reverse());
    };

    const getFreshData = (url, cacheResponse) => {
        axios
            .get(url)
            .then((res) => {
                updateLoadingState(false);
                const data = res.data.data;
                cacheResponse && writeToCache(url, data);
                setUpcomingMovies(data);
            })
            .catch((err) => {
                updateErrorState(err);
                updateLoadingState(false);
            });
    };

    const getCacheData = (url) => readFromCache(url);

    const getMovies = (cacheResponse = false) => {
        const url = `${MOVIE_PATH_BASE}${MOVIES}?limit=${MOVIES_LIMIT}&columns=${MOVIES_COLUMNS}&order=${MOVIES_ORDER}`;

        if (getCacheData(url) !== null) {
            cacheResponse = true;
            setUpcomingMovies(readFromCache(url));
            updateLoadingState(false);
        } else {
            getFreshData(url, cacheResponse);
        }
    };

    useEffect(() => {
        getMovies(true);
    }, []);

    return (
        <>
            <h1 className="homepage-heading">Upcoming Marvel Movies</h1>
            <br />
            <div className="countdowns">
                {isLoading ? (
                    <h2>Loading...</h2>
                ) : error ? (
                    <p className="centered">
                        Something went wrong, please check your internet
                        connection and refresh the page
                    </p>
                ) : (
                    upcomingMovies.map((movie, key) => {
                        if (movie.trailer !== null) {
                            return (
                                <div className="card" key={key}>
                                    <a target="_blank" href={movie.trailer}>
                                        <CountdownCard
                                            name={movie.name}
                                            timeTill={movie.timeTill}
                                            cover={movie.cover}
                                        />
                                    </a>
                                </div>
                            );
                        } else {
                            return (
                                <div className="card" key={key}>
                                    <CountdownCard
                                        name={movie.name}
                                        timeTill={movie.timeTill}
                                        cover={movie.cover}
                                    />
                                </div>
                            );
                        }
                    })
                )}
            </div>
        </>
    );
};

export default HomePage;
