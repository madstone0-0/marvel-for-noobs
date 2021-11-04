import React from "react";
import Countdown from "../Countdown";
import CountdownText from "../CountdownText";

// const timeFormat = "DD MM YYYY, hh:mm a";

// const timeTillBlackWidow = "07 05 2021, 12:00 am";
// const timeTillEternals = "05 11 2021, 12:00 am";
// const timeTillShangChi = "09 07 2021, 12:00 am";
// const timeTillDoctorStrange = "25 03 2022, 12:00 am";
// const timeTillThor = "06 05 2022, 12:00 am";
// const timeTillBlackPanther = "06 05 2021, 12:00 am";
// const timeTillBlackPanther = "01 11 2022, 12:00 am";

const timeTillEternals = "05 Nov 2021 00:00:00 GMT";
const timeTillDoctorStrange = "25 Mar 2022 00:00:00 GMT";
const timeTillThor = "06 May 2022 00:00:00 GMT";
const timeTillBlackPanther = "01 Nov 2022 00:00:00 GMT";
const timeTillSpiderMan = "17 Dec 2021 00:00:00 GMT";

const HomePage = () => (
    <div>
        {/* <div>
            <h1 className="homepage-heading">Upcomimg Marvel Movies</h1>
            <br />
            <div>
                <h3 className="countdown-name">Black Panther 2</h3>
                <div>
                    <Countdown
                        timeFormat={timeFormat}
                        timeTillDate={timeTillBlackPanther}
                    />
                </div>
                <br />
                <h3 className="countdown-name">Eternals</h3>
                <Countdown
                    timeFormat={timeFormat}
                    timeTillDate={timeTillEternals}
                />
                <br />
                <h3 className="countdown-name">
                    Shang Chi and the Legend of the Ten Rings
                </h3>
                <Countdown
                    timeFormat={timeFormat}
                    timeTillDate={timeTillShangChi}
                />
                <br />}
                <h3 className="countdown-name">
                    Doctor Strange in the Multiverse of Madness
                </h3>
                <Countdown
                    timeFormat={timeFormat}
                    timeTillDate={timeTillDoctorStrange}
                />
                <br />
                <h3 className="countdown-name">Thor: Love and Thunder</h3>
                <Countdown
                    timeFormat={timeFormat}
                    timeTillDate={timeTillThor}
                />
                <br />
                <h3 className="countdown-name">Black Panther 2</h3>
                <Countdown
                    timeFormat={timeFormat}
                    timeTillDate={timeTillBlackPanther}
                />
                }<h4 style={{ textAlign: "center" }}>More coming soon</h4>
            </div>
        </div> */}
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
