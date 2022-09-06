import React from "react";
import CountdownText from "../CountdownText";

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
const HomePage = () => (
    <div>
        <div>
            <h1 className="homepage-heading">Upcomimg Marvel Movies</h1>
            <br />
            <div className="countdowns">
                {movies.map((movie, key) => {
                    return (
                        <div className="card" key={key}>
                            <CountdownText
                                name={movie.name}
                                timetill={movie.timeTill}
                            />
                            <br />
                            <br />
                        </div>
                    );
                })}
            </div>
            <h4 style={{ textAlign: "center" }}>More coming soon</h4>
        </div>
    </div>
);

export default HomePage;
