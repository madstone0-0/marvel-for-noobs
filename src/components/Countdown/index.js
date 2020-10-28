import React, { Component } from "react";
import moment from "moment";

class Countdown extends Component {
    state = {
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined,
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            const { timeTillDate, timeFormat } = this.props;
            const then = moment(timeTillDate, timeFormat);
            const now = moment();
            const countdown = moment(then - now);
            const days = countdown.format("DDDD");
            const hours = countdown.format("HH");
            const minutes = countdown.format("mm");
            const seconds = countdown.format("ss");

            this.setState({ days, hours, minutes, seconds });
        }, 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        const { days, hours, minutes, seconds } = this.state;

        // Mapping the date values to radius values
        const daysRadius = mapNumber(days, 300, 0, 0, 360);
        const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
        const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
        const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

        if (!seconds) {
            return null;
        }

        return (
            <div>
                <div className="countdown-wrapper">
                    <div className="countdown-item">
                        <SVGCircle
                            className="countdown-circle"
                            radius={daysRadius}
                        />
                        {days}
                        <span>
                            <h4>days</h4>
                        </span>
                    </div>
                    <div className="countdown-item">
                        <SVGCircle
                            className="countdown-circle"
                            radius={hoursRadius}
                        />
                        {hours}
                        <span>
                            <h4>hours</h4>
                        </span>
                    </div>
                    <div className="countdown-item">
                        <SVGCircle
                            className="countdown-circle"
                            radius={minutesRadius}
                        />
                        {minutes}
                        <span>
                            <h4>minutes</h4>
                        </span>
                    </div>
                    <div className="countdown-item">
                        <SVGCircle
                            className="countdown-circle"
                            radius={secondsRadius}
                        />
                        {seconds}
                        <span>
                            <h4>seconds</h4>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

const SVGCircle = ({ radius }) => (
    <svg className="countdown-svg">
        <path
            fill="none"
            stroke="#333"
            strokeWidth="4"
            d={describeArc(50, 50, 48, 0, radius)}
        />
    </svg>
);

// From StackOverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M",
        start.x,
        start.y,
        "A",
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y,
    ].join(" ");

    return d;
}

// From StackOverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(number, in_min, in_max, out_min, out_max) {
    return (
        ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
}

export default Countdown;
