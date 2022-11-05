import React, { useEffect, useState } from "react";
import CountdownCard from "../CountdownCard";
import axios from "axios";

import {
    MOVIE_PATH_BASE,
    MOVIES,
    MOVIES_LIMIT,
    MOVIES_COLUMNS,
    MOVIES_ORDER,
} from "../constants";

const movies = [
    {
        name: "Ant-Man and the Wasp: Quantumania",
        timeTill: "17 Feb 2023 00:00:00 GMT",
    },
    {
        name: "Guardians Of The Galaxy Vol. 3",
        timeTill: "05 May 2023 00:00:00 GMT",
    },
    {
        name: "Thor: Love and Thunder",
        timeTill: "08 Jul 2022 00:00:00 GMT",
    },
    {
        name: "Black Panther 2",
        timeTill: "11 Nov 2022 00:00:00 GMT",
    },
    {
        name: "The Marvels",
        timeTill: "28 Jul 2023 00:00:00 GMT",
    },
    {
        name: "Blade",
        timeTill: "03 Nov 2023 00:00:00 GMT",
    },
    {
        name: "Captain America: New World Order",
        timeTill: "03 May 2024 00:00:00 GMT",
    },
    {
        name: "Thunderbolts",
        timeTill: "26 Jul 2024 00:00:00 GMT",
    },
];

/**
 * Responsible for home page tab
 */
const HomePage = () => {
    const [upcomingMovies, setMovies] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            });
        });
        console.log({ new_data });
        setMovies(new_data);
    };

    const getMovies = () => {
        const url = `${MOVIE_PATH_BASE}${MOVIES}?limit=${MOVIES_LIMIT}&columns=${MOVIES_COLUMNS}&order=${MOVIES_ORDER}`;
        axios
            .get(url)
            .then((res) => {
                setLoading(false);
                const data = res.data.data;
                setUpcomingMovies(data);
                console.log({ data });
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
                console.log(err);
            });
    };

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div>
            <div>
                <h1 className="homepage-heading">Upcoming Marvel Movies</h1>
                <br />
                <div className="countdowns">
                    {isLoading ? (
                        <h2>Loading...</h2>
                    ) : error ? (
                        movies.map((movie, key) => {
                            return (
                                <div className="card" key={key}>
                                    <CountdownCard
                                        name={movie.name}
                                        timeTill={movie.timeTill}
                                        cover={movie.cover}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        upcomingMovies.map((movie, key) => {
                            return (
                                <div className="card" key={key}>
                                    <CountdownCard
                                        name={movie.name}
                                        timeTill={movie.timeTill}
                                        cover={movie.cover}
                                    />
                                </div>
                            );
                        })
                    )}
                </div>
                <h4 style={{ textAlign: "center" }}>More coming soon</h4>
            </div>
        </div>
    );
};

export default HomePage;
