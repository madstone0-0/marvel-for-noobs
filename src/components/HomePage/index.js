import React from "react";
import Countdown from "../Countdown";
import CountdownText from "../CountdownText";

const timeTillEternals = "05 Nov 2021 00:00:00 GMT";
const timeTillDoctorStrange = "25 Mar 2022 00:00:00 GMT";
const timeTillThor = "06 May 2022 00:00:00 GMT";
const timeTillBlackPanther = "01 Nov 2022 00:00:00 GMT";
const timeTillSpiderMan = "17 Dec 2021 00:00:00 GMT";

/**
 * Responsible for home page tab
 */
const HomePage = () => (
    <div>
        <div>
            <h1 className="homepage-heading">Upcomimg Marvel Movies</h1>
            <br />
            <div>
                <div>
                    <CountdownText
                        name={"Eternals"}
                        timetill={timeTillEternals}
                    />
                </div>
                <br />
                <br />
                <div>
                    <CountdownText
                        name={"Doctor Strange Multiverse of Madness"}
                        timetill={timeTillDoctorStrange}
                    />
                </div>
                <br />
                <br />
                <div>
                    <CountdownText
                        name={"Thor: Love and Thunder"}
                        timetill={timeTillThor}
                    />
                </div>
                <br />
                <br />
                <div>
                    <CountdownText
                        name={"Black Panther 2"}
                        timetill={timeTillBlackPanther}
                    />
                </div>
                <br />
                <br />
                <div>
                    <CountdownText
                        name={"Spider-Man: No Way Home"}
                        timetill={timeTillSpiderMan}
                    />
                </div>
            </div>
            <br />
            <br />
            <h4 style={{ textAlign: "center" }}>More coming soon</h4>
        </div>
    </div>
);

export default HomePage;
