import PropTypes from "prop-types";
import React from "react";
import Countdown from "react-countdown";

const Complete = () => <span>In theaters now!</span>;
const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        return <Complete />;
    } else {
        return (
            <span>
                {days}D {hours}H {minutes}M {seconds}S{" "}
            </span>
        );
    }
};

/**
 * Displays a countdown for movies
 */
const CountdownText = ({ timeTill, name }) => (
    <div>
        <div className="card-header">
            <h3 className="countdown-name">{name}</h3>
        </div>
        <div className="card-body">
            <div className="countdown-wrapper countdowntext-time">
                <Countdown renderer={renderer} date={timeTill}>
                    <Complete />
                </Countdown>
            </div>
        </div>
    </div>
);

CountdownText.propTypes = {
    timeTill: PropTypes.string,
    name: PropTypes.string,
};

export default CountdownText;
