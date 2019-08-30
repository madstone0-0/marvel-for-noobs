import React from "react";
import Countdown from "../Countdown";

const timeFormat = "DD MM YYYY, h:mm a";

const timeTillBlackWidow = "01 05 2020, 1:00 am";
// const timeTillEternals = "06 09 2020, 1:00 am";
// const timeTillShangChi = "21 02 2021, 1:00 am";
// const timeTillDocterStrange = "07 05 2021, 1:00 am";
// const timeTillThor = "05 09 2021, 1:00 am";

const HomePage = () => (
    <div>
        <div>
            <h1 className="homepage-heading">Upcomimg Marvel Movies</h1>
            <br/>
            <div>
                <h3 className="countdown-name">
                Black Widow
                </h3>
                <div>
                <Countdown timeFormat={timeFormat} timeTillDate={timeTillBlackWidow}/>
                </div>
                <br/>
                <h4 style={{"textAlign":"center"}}>More coming soon</h4>
            </div>
        </div>
    </div>
);

export default HomePage;
