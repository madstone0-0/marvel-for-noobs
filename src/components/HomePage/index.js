import React from "react";
import Countdown from "../Countdown";

const timeFormat = "DD MM YYYY, h:mm a";

const timeTillBlackWidow = "07 05 2021, 12:00 am";
const timeTillEternals = "05 11 2021, 12:00 am";
const timeTillShangChi = "07 05 2021, 12:00 am";
const timeTillDoctorStrange = "05 05 2021, 12:00 am";
const timeTillThor = "05 11 2021, 12:00 am";
// const timeTillBlackPanther = "06 05 2021, 12:00 am";

const HomePage = () => (
    <div>
        <div>
            <h1 className="homepage-heading">Upcomimg Marvel Movies</h1>
            <br />
            <div>
                <h3 className="countdown-name">Black Widow</h3>
                <div>
                    <Countdown
                        timeFormat={timeFormat}
                        timeTillDate={timeTillBlackWidow}
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
                <br />
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
                // <h3 className="countdown-name">Black Panther 2</h3>
                {/* <Countdown
                    timeFormat={timeFormat}
                    timeTillDate={timeTillBlackPanther}
                /> */}
                <h4 style={{ textAlign: "center" }}>More coming soon</h4>
            </div>
        </div>
    </div>
);

export default HomePage;
