import React, { useEffect, useRef, useState } from 'react';

function CountTime({firstValue, onClearTime, onBackToPrev, onChangeStatusTime}) {
    const [count, setCount] = useState(firstValue);
    const time = useRef();
    const [currentTime, setCurrentTime] = useState();
    const stopTime = () => {
        clearInterval(time.current);
    }
    const startTime = () => {
        time.current = setInterval(() => {
            setCount(prev => prev-1);
        }, 1000)
    }
    useEffect(() => {
        time.current = setInterval(() => {
            setCount(prev => prev-1);
        }, 1000)
        
       return () => clearInterval(time.current)
    },[])
    useEffect(() => {
        if(count == 0) {
            clearInterval(time.current);
            onBackToPrev && onBackToPrev();
            onClearTime && onClearTime('timeover');
        }
    }, [count]);
    //dung thoi gian
    useEffect(() => {
        if(onChangeStatusTime) {
            stopTime();
        }
    },[onChangeStatusTime])
    return (
        <div className='time_count'>{`00:${count >=10 ? count : `0${count}`}`}</div>   
    );
}

export default CountTime;