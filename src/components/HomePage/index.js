import React from "react";
import CountdownText from "../CountdownText";

const timeTillEternals = "05 Nov 2021 00:00:00 GMT";
const timeTillDoctorStrange = "25 Mar 2022 00:00:00 GMT";
const timeTillThor = "08 Jul 2022 00:00:00 GMT";
const timeTillBlackPanther = "11 Nov 2022 00:00:00 GMT";
const timeTillSpiderMan = "17 Dec 2021 00:00:00 GMT";
const timeTillAntMan = "17 Feb 2023 00:00:00 GMT";
const timeTillGuardians = "05 May 2023 00:00:00 GMT";
const timeTillMarvels = "28 Jul 2023 00:00:00 GMT";

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
                        name={"Ant-Man And The Wasp: Quantumania"}
                        timetill={timeTillAntMan}
                    />
                </div>
                <br />
                <br />
                <div>
                    <CountdownText
                        name={"Guardians Of The Galaxy Vol. 3"}
                        timetill={timeTillGuardians}
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
                        name={"The Marvels"}
                        timetill={timeTillMarvels}
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
