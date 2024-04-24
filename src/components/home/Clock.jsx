import { useEffect, useState } from "react";

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
        <div id="minutArrow" style={{transform: `translate(-50%, -50%) rotate(${(time.getMinutes() * 6 + time.getSeconds() / 10)}deg)`}}>
                <div></div>
            </div>
            <div id="hourArrow" style={{transform: `translate(-50%, -50%) rotate(${(time.getHours() * 30 + time.getMinutes() / 2)}deg)`}}>
                <div></div>
            </div>
            <div id="secondArrow" style={{transform: `translate(-50%, -50%) rotate(${time.getSeconds() * 6}deg)`}}>
                <div></div>
            </div>
            <div id="clockMidCircle"></div>
        </>
    );
};

export default Clock;