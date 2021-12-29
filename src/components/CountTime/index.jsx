import React, { useEffect, useRef, useState } from 'react';

function CountTime({ firstValue, onClearTime, onBackToPrev, onChangeStatusTime }) {
    const [count, setCount] = useState(parseInt(firstValue));
    const time = useRef();
    // const [currentTime, setCurrentTime] = useState();
    const stopTime = () => {
        clearInterval(time.current);
    }
    // const startTime = () => {
    //     time.current = setInterval(() => {
    //         setCount(prev => prev - 1);
    //     }, 1000)
    // }
    useEffect(() => {
        time.current = setInterval(() => {
            setCount(prev => prev - 1);
        }, 1000)

        return () => clearInterval(time.current)
    }, [])
    useEffect(() => {
        if (count === 0) {
            clearInterval(time.current);
            onBackToPrev && onBackToPrev();
            onClearTime && onClearTime('timeover');
        }
    }, [count]);
    //dung thoi gian
    useEffect(() => {
        if (onChangeStatusTime) {
            stopTime();
        }
    }, [onChangeStatusTime]);

    const caculatorTime = (time) => {
        const second = time % 60 >= 10 ? time % 60 : `0${time % 60}`;
        const minute = Math.floor(time / 60) >= 10 ? Math.floor(time / 60) : `0${Math.floor(time / 60)}`;
        return `${minute}:${second}`;
    }
    return (
        <div className='time_count'>{caculatorTime(count)}</div>
    );
}

export default CountTime;