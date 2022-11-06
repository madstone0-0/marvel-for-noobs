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
const CountdownCard = ({ timeTill, name, cover }) => (
    <div>
        {/* <img className="countdown-image" src={cover}></img> */}
        <div
            style={{
                backgroundImage: `url(${cover})`,
                display: "block",
                // maxWidth: "451px",
                // maxHeight: "670px",
                width: "auto",
                height: "auto",
                backgroundPosition: "center",
            }}
            className="card-header"
        ></div>
        <div className="card-body">
            <div className="card-name">
                <h3 className="countdown-name">{name}</h3>
            </div>
            <div className="countdown-wrapper countdowntext-time">
                <Countdown renderer={renderer} date={timeTill}>
                    <Complete />
                </Countdown>
            </div>
        </div>
    </div>
);

export default CountdownCard;
